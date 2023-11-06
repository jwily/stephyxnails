from django.conf import settings

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create an account for Stephy'

    def handle(self, *args, **kwargs):

        name = settings.ADMIN_LOGIN_NAME
        email = settings.ADMIN_LOGIN_EMAIL
        password = settings.ADMIN_LOGIN_PASSWORD

        User = get_user_model()

        if not User.objects.filter(username=name).exists():
            User.objects.create_superuser(name, email, password)
            self.stdout.write(self.style.SUCCESS('Superuser created successfully!'))
        else:
            self.stdout.write(self.style.WARNING('Superuser "admin" already exists.'))

