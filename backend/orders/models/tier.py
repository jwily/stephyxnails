from django.db import models

class Tier(models.Model):
  name = models.CharField(max_length=100)
  price = models.IntegerField()
  description = models.TextField()

  class Meta:
    ordering = ['price']

  def __str__(self):
    return self.name + ' $' + str(self.price) + '+'
