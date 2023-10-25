from django.db import models

STATUS_CHOICES = (
  ('pending', 'Pending'),
  ('in_progress', 'In Progress'),
  ('canceled', 'Canceled'),
  ('completed', 'Completed'),
)

SHAPE_CHOICES = (
  ('xs-square', 'Extra-Short Square'),
  ('s-square', 'Short Square'),
  ('m-square', 'Medium Square'),
  ('s-coffin', 'Short Coffin'),
  ('m-coffin', 'Medium Coffin'),
  ('s-round', 'Short Round'),
  ('m-round', 'Medium Round'),
  ('s-almond', 'Short Almond'),
  ('m-almond', 'Medium Almond'),
  ('m-stilleto', 'Medium Stiletto'),
)

# Create your models here.
class Order(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=254)
  instagram = models.CharField(max_length=100, blank=True, default='')
  status = models.CharField(choices=STATUS_CHOICES, default='pending', max_length=15)

  class Meta:
    ordering = ['-created']

class Tier(models.Model):
  name = models.CharField(max_length=100)
  price = models.IntegerField()
  description = models.TextField(max_length=5000)

  class Meta:
    ordering = ['price']

class Set(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  description = models.TextField(max_length=5000)
  shape = models.CharField(max_length=254, choices=SHAPE_CHOICES)
  sizes = models.CharField(max_length=254)

  order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='sets')
  tier = models.ForeignKey(Tier, on_delete=models.CASCADE, related_name='sets')

  class Meta:
    ordering = ['created']

class SetImage(models.Model):
  url = models.URLField()

  set = models.ForeignKey(Set, on_delete=models.CASCADE, related_name='set_images')

  class Meta:
    ordering = ['id']

class ExampleImage(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  url = models.URLField()

  tier = models.ForeignKey(Tier, on_delete=models.CASCADE, related_name='example_images', null=True, blank=True)

  class Meta:
    ordering = ['-created']
