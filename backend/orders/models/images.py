from django.db import models

class SetImage(models.Model):
  url = models.URLField()

  set = models.ForeignKey('Set', on_delete=models.CASCADE, related_name='images')

  class Meta:
    ordering = ['id']


class ExampleImage(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  url = models.URLField(max_length=3000)
  instagram_id = models.CharField(unique=True, max_length=255)
  image = models.ImageField(upload_to='gallery/', null=True, blank=True)

  tier = models.ForeignKey('Tier', on_delete=models.CASCADE, related_name='example_images', null=True, blank=True)

  class Meta:
    ordering = ['-created']
