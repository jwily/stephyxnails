from rest_framework import serializers
from orders.models import Order, Set


class OrderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    # Edit these fields!
    fields = ['id', 'name', 'email', 'instagram', 'created', 'updated', 'sets']

class SetSerializer(serializers.ModelSerializer):
  order = OrderSerializer(read_only=True)

  class Meta:
    model = Set
    # Edit these fields!
    fields = ['id', 'created', 'updated', 'description', 'order']
