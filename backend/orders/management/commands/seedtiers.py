from django.conf import settings
from orders.models import Tier
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create tier seeds'

    def handle(self, *args, **kwargs):

      tiers = [{
          'name': 'Budding Tier',
          'price': 35,
          'description': 'Solid colors (including solid chrome or glitter nails), a few gems/stickers.'
        },
        {
          'name': 'Petal Tier',
          'price': 50,
          'description': 'Ombré, airbrush, French tips, simple hand painted designs, 1~2 simple characters, some gems/stickers, 1~2 3D charms.'
        },
        {
          'name' : 'Sakura Tier',
          'price' : 65,
          'description': 'Intricate/detailed nail art, 1~2 detailed portraits OR hand sculpted charms, more gems/charms.'
        },
        {
          'name' : 'Blossom Tier',
          'price' : 80,
          'description' : 'Intricate designs across all nails, up to 5 hand sculpted charms, large and complex charm arrangements.'
        }]

      for tier in tiers:
        if not Tier.objects.filter(name=tier['name']).exists():
            Tier.objects.create(name=tier['name'], price=tier['price'], description=tier['description'])
            self.stdout.write(self.style.SUCCESS('Tier created successfully!'))
        else:
            self.stdout.write(self.style.WARNING('Tier already exists.'))
