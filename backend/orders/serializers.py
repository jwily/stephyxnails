
from rest_framework import serializers
from orders.models import Order, Set, Tier, SetImage, ExampleImage
from drf_recaptcha.fields import ReCaptchaV2Field

class ExampleImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = ExampleImage
    fields = ['id', 'url', 'tier', 'created', 'instagram_id']

class TierSerializer(serializers.ModelSerializer):

  class Meta:
    model = Tier
    fields = ['id', 'name', 'price', 'description']

class SetImageSerializer(serializers.ModelSerializer):

  set = serializers.PrimaryKeyRelatedField(read_only=True)

  class Meta:
    model = SetImage
    fields = ['id', 'url', 'set']

class SetSerializer(serializers.ModelSerializer):

  # tier = serializers.PrimaryKeyRelatedField(queryset=Tier.objects.all())
  order = serializers.PrimaryKeyRelatedField(read_only=True)
  images = SetImageSerializer(many=True)

  class Meta:
    model = Set
    fields = ['id', 'created', 'updated', 'description', 'shape', 'left_sizes', 'right_sizes', 'tier', 'order', 'images']

class OrderSerializer(serializers.ModelSerializer):
  sets = SetSerializer(many=True)
  # recaptcha = ReCaptchaV2Field()

  class Meta:
    model = Order
    fields = ['id', 'name', 'email', 'instagram', 'created', 'updated', 'status', 'sets']

  def create(self, validated_data):
    sets_data = validated_data.pop('sets')
    # validated_data.pop('recaptcha')

    # valid_data = {key: value for key, value in validated_data.items() if key != 'recaptcha'}
    # print('valid_data ----->', valid_data )
    order = Order.objects.create(**validated_data)

    for set_data in sets_data:
        images_data = set_data.pop('images')
        new_set = Set.objects.create(order=order, **set_data)
        for image_data in images_data:
          SetImage.objects.create(set=new_set, **image_data)
    return order
