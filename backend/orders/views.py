import urllib.request

from django.views.generic import TemplateView
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.template import engines

from rest_framework import generics
from rest_framework.permissions import AllowAny

from orders.models import Order, Set, Tier, SetImage, ExampleImage
from orders.serializers import OrderSerializer, SetSerializer, SetImageSerializer, ExampleImageSerializer, TierSerializer

class OrderList(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderCreate(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

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
