from django.db import models

STATUS_CHOICES = (
  ('pending', 'Pending'),
  ('in_progress', 'In Progress'),
  ('completed', 'Completed'),
  ('canceled', 'Canceled'),
)

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
