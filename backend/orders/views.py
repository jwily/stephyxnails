import urllib.request

from django.views.generic import TemplateView
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.template import engines

from django.conf import settings
from django.core.mail import send_mail

from rest_framework import generics, status
from rest_framework.response import Response

from orders.models import Order, Set, Tier, SetImage, ExampleImage
from orders.serializers import OrderSerializer, SetSerializer, SetImageSerializer, ExampleImageSerializer, TierSerializer
from django.shortcuts import redirect
from django.urls import reverse
import requests

# Seems like we ultimately don't need a /orders/ GET route
class OrderCreate(generics.ListCreateAPIView):
    print('in create order')
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        customer_email = {
            'subject': "Stephy ♥ - I've received your order request!",
            'message': f"""
            Thank you for your order request, {serializer.data["name"]}!

            I will reach out to you soon with any further questions, and if everything looks good, I will request your shipping address.
            """,
            'from_email': settings.EMAIL_HOST_USER,
            'recipient_list': [serializer.data['email']]
        }

        owner_email = {
            'subject': "New order request received!",
            'message': f'New order for {serializer.data["name"]}!',
            'from_email': settings.EMAIL_HOST_USER,
            'recipient_list': ['johnlee1120@gmail.com']
        }

        send_mail(**customer_email)
        send_mail(**owner_email)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class SetList(generics.ListAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

class SetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

class TierList(generics.ListCreateAPIView):
    queryset = Tier.objects.all()
    serializer_class = TierSerializer

class TierDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tier.objects.all()
    serializer_class = TierSerializer

class ExampleImageList(generics.ListCreateAPIView):
    queryset = ExampleImage.objects.all()
    serializer_class = ExampleImageSerializer

class ExampleImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExampleImage.objects.all()
    serializer_class = ExampleImageSerializer

# class SetImageList(generics.ListCreateAPIView):
#     queryset = SetImage.objects.all()
#     serializer_class = SetImageSerializer

class SetImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SetImage.objects.all()
    serializer_class = SetImageSerializer

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

    # This function is meant to kick in during development when
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

# Not 100% sure, but it seems like setting the 'DIRS' attribute
# of the TEMPLATES value in the settings directs Django
# to the frontend folder to find the index.html file.

catchall_prod = TemplateView.as_view(template_name='index.html')

# Defines which catchall view will be used based on the environment.

catchall = catchall_dev if settings.DEBUG else catchall_prod

def instagram_callback(request):

    state = request.GET.get('state')
    expected_state = request.session.get('oauth_state')

    if not state or state != expected_state:
        # Possible CSRF attack
        print('>>>', 'State not matching')
        return redirect('admin:orders_exampleimage_changelist')

    code = request.GET.get('code')
    if not code:
        print('>>>', 'No code detected')
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

    media_request_url = f"https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token={access_token}"
    media_response = requests.get(media_request_url)
    media_data = media_response.json()
    post_images = []

    while media_request_url:

        print('===== In While Loop =====')

        request = requests.get(media_request_url)
        media_data = request.json()

        post_data = media_data.get('data',[])
        post_images.extend(post_data)

        next_url = media_data['paging'].get('next')

        if next_url:
            print('==== Next Url Exist ====')
            media_request_url = next_url
        else:
            print('==== Next Url Does Not Exist ====')
            media_request_url = None


    all_ids = set([obj.instagram_id for obj in ExampleImage.objects.all()])

    print('ALL_IDS--->', all_ids)

    # print('NEXT URL ---->', media_data['paging']['next'])
    # while media_data:
    #     post_data = media_data['data']
    #     print('========= In while loop ===========')
    #     for post in post_data:
    #         post_images.append(post)

    #     exists = 'next' in media_data['paging']
    #     # print('media data',media_data)
    #     print('next in media data-paging', exists)
    #     print('MEDIA_DATA-PAGING-NEXT ---->',media_data['paging']['next'])
    #     if(exists):
    #         try:
    #             next_response = requests.get(media_data['paging']['next'])
    #             media_data = next_response.json()

    #             print('NEXT DATA ---->', media_data)
    #         except Exception as e:
    #             print('EXCEPTION --->',e)
    #     else:
    #         media_data = False

    print('post images----->', post_images)

    for post in post_images:
        if (post['media_type'] == 'IMAGE' or post['media_type'] == 'CAROUSEL_ALBUM') and post['id'] not in all_ids:
            try:
                ExampleImage.objects.create(url=post['media_url'], instagram_id=post['id'])
            except Exception as e:
                print(e)
    print('redirect url',request.build_absolute_uri(reverse('admin:orders_exampleimage_changelist')))
    return redirect(request.build_absolute_uri(reverse('admin:orders_exampleimage_changelist')))
