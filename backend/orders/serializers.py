from rest_framework import serializers
from orders.models import Order, Set


class OrderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    # Edit these fields!
    fields = ['id', 'name', 'email', 'instagram', 'created', 'updated']

class SetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Set
    # Edit these fields!
    fields = ['id', 'created', 'updated', 'description']
