from orders.models import Order, Set, Tier, SetImage, ExampleImage
from orders.serializers import OrderSerializer, SetSerializer, SetImageSerializer, ExampleImageSerializer, TierSerializer
from rest_framework import generics
from django.shortcuts import render

"""
This view associated with "orders/"
GET orders/
POST orders/
"""
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

"""
This view associated with "orders/<int:pk>"
GET orders/<int:pk>
PUT or PATCH orders/<int:pk>
DELETE orders/<int:pk>
"""
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

def render_react(request):
    return render(request, "index.html")
