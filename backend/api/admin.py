from django.contrib import admin


from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin


class CustomAdminSite(admin.AdminSite):
    site_header = "Stephy's admin page"

admin_site = CustomAdminSite(name="stephyadmin")
admin_site.register(User, UserAdmin)

# print('admin site urls', admin_site.urls)
