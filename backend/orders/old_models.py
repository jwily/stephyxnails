from django.db import models
from django.template.defaultfilters import truncatechars

STATUS_CHOICES = (
  ('pending', 'Pending'),
  ('in_progress', 'In Progress'),
  ('completed', 'Completed'),
  ('canceled', 'Canceled'),
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

  def __str__(self):
    return self.name + ' ' + self.created.strftime("%b '%y")


class Tier(models.Model):
  name = models.CharField(max_length=100)
  price = models.IntegerField()
  description = models.TextField()

  class Meta:
    ordering = ['price']

  def __str__(self):
    return self.name + ' $' + str(self.price) + '+'


class Set(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  description = models.TextField()
  shape = models.CharField(max_length=254, choices=SHAPE_CHOICES)
  sizes = models.CharField(max_length=254)

  order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='sets')
  tier = models.ForeignKey(Tier, on_delete=models.CASCADE, related_name='sets')

  class Meta:
    ordering = ['-created']

  @property
  def short_description(self):
    if len(self.description) <= 50:
      return self.description
    return truncatechars(self.description, 50)


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
