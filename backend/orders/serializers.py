
from rest_framework import serializers
from orders.models import Order, Set, Tier, SetImage, ExampleImage
from drf_recaptcha.fields import ReCaptchaV2Field

class ExampleImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = ExampleImage
    fields = ['id', 'url', 'tier', 'created']

class TierSerializer(serializers.ModelSerializer):
  # tier_images = ExampleImageSerializer(many=True, read_only=True)

  class Meta:
    model = Tier
    fields = ['id', 'name', 'price', 'description']

class SetImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = SetImage
    fields = ['id', 'url', 'set']

class SetSerializer(serializers.ModelSerializer):

  # We were having trouble when using just the "TierSerializer"
  # With that, the POST request was expecting a complete tier object
  # By changing it to this thing, we can pass in just the tier's PK
  tier = serializers.PrimaryKeyRelatedField(queryset=Tier.objects.all())
  order = serializers.PrimaryKeyRelatedField(read_only=True)

  class Meta:
    model = Set
    fields = ['id', 'created', 'updated', 'description', 'shape', 'sizes', 'tier', 'order']

class OrderSerializer(serializers.ModelSerializer):
  sets = SetSerializer(many=True)
  recaptcha = ReCaptchaV2Field()

  class Meta:
    model = Order
    fields = ['id', 'name', 'email', 'instagram', 'created', 'updated', 'sets', 'status']

  def create(self, validated_data):
    sets_data = validated_data.pop('sets')
    order = Order.objects.create(**validated_data)
    for set_data in sets_data:
        Set.objects.create(order=order, **set_data)
    return order
