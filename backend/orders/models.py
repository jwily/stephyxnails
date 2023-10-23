from django.db import models

# Create your models here.
class Order(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  name = models.CharField(max_length=127)
  email = models.EmailField(max_length=254)
  instagram = models.CharField(max_length=127, blank=True, default='')

  class Meta:
    ordering = ['updated']

class Set(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  description = models.TextField()

  class Meta:
    ordering = ['created']


class Tier(models.Model):
  price = models.IntegerField()
  description = models.TextField()
  name = models.CharField(max_length=31)

  class Meta:
    ordering = ['price']
