from django.db import models
from django.template.defaultfilters import truncatechars

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

def shape_name(model_value):
  for value, name in SHAPE_CHOICES:
    if value == model_value:
      return name

class Set(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  description = models.TextField()
  shape = models.CharField(max_length=254, choices=SHAPE_CHOICES)
  left_sizes = models.CharField(max_length=254)
  right_sizes = models.CharField(max_length=254)
  charms = models.IntegerField()
  characters = models.IntegerField()

  order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='sets')
  tier = models.ForeignKey('Tier', on_delete=models.CASCADE, related_name='sets')

  class Meta:
    ordering = ['-created']

  def __str__(self):
    return f"{self.id} - {shape_name(self.shape)}"

  @property
  def short_description(self):
    if len(self.description) <= 50:
      return self.description
    return truncatechars(self.description, 50)

  @property
  def estimated_price(self):
    return '$' + str(self.tier.price + (self.charms * 5) + (self.characters * 10)) + '.00'
