import json
import requests
import urllib.request
import tempfile
import imghdr

from django.urls import reverse
from django.conf import settings
from django.template import engines
from django.shortcuts import redirect
from django.http import HttpResponse, StreamingHttpResponse
from django.core.files.storage import default_storage

from django.core.mail import send_mail
from django.views.generic import TemplateView

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer

from io import BytesIO
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from PIL import Image
from django.core.files.base import ContentFile

from orders.models import Order, Set, Tier, SetImage, ExampleImage
from orders.serializers import OrderSerializer, SetSerializer, SetImageSerializer, ExampleImageSerializer, TierSerializer

from .aws import upload_file_to_s3, upload_temp_to_s3

# The imports and method below
# can be used to count database queries.
# Use the method as a decorator on a given function.

# from django.db import connection, reset_queries

# def count_queries(func):
#     def wrapper(*args, **kwargs):
#         reset_queries()
#         result = func(*args, **kwargs)
#         print(f'Number of Queries: {len(connection.queries)}')
#         return result
#     return wrapper

"""
Seems like we ultimately don't need a /orders/ GET route
so when ready, we should change this to just a CreateAPIView
as otherwise anyone could see all orders!
"""

class OrderCreate(generics.CreateAPIView):

    # The "prefetch" method allows for fewer queries.
    # Kind of like eager loading I think?
    queryset = Order.objects.prefetch_related('sets__images')
    serializer_class = OrderSerializer
    # renderer_classes = (JSONRenderer,)

    # permission_classes = [AllowAny]

    @staticmethod
    def parse_data(request_data):

        json_data = request_data['json'].read().decode('utf-8')
        data = json.loads(json_data)

        for key in request_data:
            if 'files' in key:

                split_key = key.split('_')
                set_number = int(split_key[2])

                image_files = request_data.getlist(key)

                for image in image_files:
                    url = upload_file_to_s3(image)
                    parent_set = data['sets'][set_number]
                    parent_set['images'].append({'url': url})

        return data

    @staticmethod
    def send_emails(data):

        # This method likely needs some error handling

        customer_email = {
            'subject': "Stephy ♥ - I've received your order request!",
            'message': f"""
            Thank you for your order request, {data["name"]}!

            I will reach out to you soon with any further questions, and if everything looks good, I will request your shipping address.
            """,
            'from_email': settings.EMAIL_HOST_USER,
            'recipient_list': [data['email']]
        }

        owner_email = {
            'subject': "New order request received!",
            'message': f'New order for {data["name"]}!',
            'from_email': settings.EMAIL_HOST_USER,
            'recipient_list': [settings.EMAIL_HOST_USER]
        }

        send_mail(**customer_email)
        send_mail(**owner_email)

    def create(self, request, *args, **kwargs):

        data = request.data

        if 'multipart/form-data' in request.headers['Content-Type']:
          data = OrderCreate.parse_data(request.data)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        OrderCreate.send_emails(serializer.data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TierList(generics.ListAPIView):
    queryset = Tier.objects.all()
    serializer_class = TierSerializer
    # renderer_classes = (JSONRenderer,)

class ExampleImageList(generics.ListAPIView):
    queryset = ExampleImage.objects.all()
    serializer_class = ExampleImageSerializer
    # renderer_classes = (JSONRenderer,)

def iter_response(response, chunk_size=65536):

    # By default, when a response is read, it attempts
    # to read all of the content at once until the end.

    # This function will be used to break up a response
    # into small chunks (64 KB to be precise) for a smoother
    # development experience.

    # It will "yield" data in 64 KB chunks until all of the data is read.
    # "yield" is cool because it's like "return" but the function does not end!

    try:
        while True:
            data = response.read(chunk_size)
            if not data:
                break
            yield data
    finally:
        response.close()

def catchall_dev(request, upstream='http://localhost:3000'):

    # This function is meant to kick in during development if
    # browsing through localhost:8000. Basically, if none of the routes
    # that we defined with Django REST Framework views are requested,
    # then the assumption is that front-end stuff is being requested
    # and so the application is asked to look at localhost:3000.

    upstream_url = upstream + request.path
    response = urllib.request.urlopen(upstream_url)
    content_type = response.getheader('Content-Type')

    # If the content type is HTML, then it will be read and served
    # using Django's templating system.

    # If it isn't, it must be some other type of static resource, which
    # will be broken up into chunks using the function from above.

    # StreamingHttpResponse seems to be a nice Django thing
    # that sends the response bit by bit and not all at once.

    if content_type == 'text/html; charset=UTF-8':
        response_text = response.read().decode()
        response.close()
        return HttpResponse(
            engines['django'].from_string(response_text).render(),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )

    else:
        return StreamingHttpResponse(
            iter_response(response),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )

# It seems like setting the 'DIRS' attribute
# of the TEMPLATES value in the settings directs Django
# to the frontend folder to find the index.html file.

# As you can see, because of the whole npm build process,
# it's much less work finding the React stuff to serve.
catchall_prod = TemplateView.as_view(template_name='index.html')

# Defines which catchall view will be used based on the environment.
catchall = catchall_dev if settings.DEBUG else catchall_prod

# Download image from URL
# def download_image(post):
#     response = requests.get(post)

#     if response.status_code == 200:
#         image = ExampleImage()

    # Checks HTTP response
    # response.raise_for_status()

    # with tempfile.NamedTemporaryFile(delete=False, suffix='.jpeg') as temp_file:
    #     temp_file.write(response.content)

    #     file_type = imghdr.what(None, h =response.content)

    #     print(f'temp_file file_type === {imghdr.what(None, h=temp_file.read())}')

    #     print(f'response.content file_type === {file_type}')
    #     print(f'file name === {temp_file.name}')
    #     print(f'file --- {temp_file}')

        # Upload to S3

        # s3_image_url = upload_temp_to_s3(temp_file.read())

    # return s3_image_url

def instagram_callback(request):

    state = request.GET.get('state')
    expected_state = request.session.get('oauth_state')

    if not state or state != expected_state:
        # Possible CSRF attack
        return redirect('admin:orders_exampleimage_changelist')

    code = request.GET.get('code')
    if not code:
        return redirect('admin:orders_exampleimage_changelist')

    # Exchange the code for an access token
    token_url = "https://api.instagram.com/oauth/access_token"
    token_data = {
        "client_id": settings.INSTAGRAM_APP_ID,
        "client_secret": settings.INSTAGRAM_APP_SECRET,
        "grant_type": "authorization_code",
        "redirect_uri": request.build_absolute_uri(reverse('instagram_callback')),
        "code": code,
    }

    access_response = requests.post(token_url, data=token_data)
    access_response_data = access_response.json()
    access_token = access_response_data['access_token']

    long_token_url = f"https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={settings.INSTAGRAM_APP_SECRET}&access_token={access_token}"
    long_access_response = requests.get(long_token_url)
    long_access_response_data = long_access_response.json()
    long_access_token = long_access_response_data['access_token']


    media_request_url = f"https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token={long_access_token}"
    post_images = []

    while media_request_url:

        request = requests.get(media_request_url)
        media_data = request.json()

        post_data = media_data.get('data',[])
        post_images.extend(post_data)

        next_url = media_data['paging'].get('next')

        if next_url:
            media_request_url = next_url
        else:
            media_request_url = None


    all_ids = set([obj.instagram_id for obj in ExampleImage.objects.all()])

    for post in post_images:
        if (post['media_type'] == 'IMAGE' or post['media_type'] == 'CAROUSEL_ALBUM') and post['id'] not in all_ids:
            try:
                response = requests.get(post['media_url'])
                if response.status_code == 200:
                    new_image = ExampleImage.objects.create(instagram_id=post['id'])
                    new_image.image.save(f'{post['id']}', ContentFile(response.content), save=True)
                    # s3_url = upload_file_to_s3(new_image.image)
                    # new_image.url.save(s3_url)
            except Exception as e:
                print(e)

    return redirect(reverse('admin:orders_exampleimage_changelist'))
