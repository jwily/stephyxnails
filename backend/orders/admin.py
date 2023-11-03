from django.contrib import admin
from django.forms import Textarea
from django.db import models
from admin_extra_buttons.api import ExtraButtonsMixin, button
from .models import Order, Set, Tier, SetImage, ExampleImage, STATUS_CHOICES
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect

from django.utils.crypto import get_random_string

# Register your models here.

class SetInline(admin.TabularInline):
  model = Set
  extra = 1
  formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows':5, 'cols':60})},
    }


class SetAdmin(admin.ModelAdmin):
  list_display = ['order', 'short_description', 'shape', 'sizes', 'tier', 'created', 'updated']


class OrderAdmin(admin.ModelAdmin):
  inlines = [SetInline]
  list_display = ['__str__', 'name', 'email', 'instagram', 'status', 'created', 'updated']

  @admin.action(description="Mark selected as completed")
  def make_completed(self, request, queryset):
      queryset.update(status="completed")

  @admin.action(description="Mark selected as pending")
  def make_pending(self, request, queryset):
      queryset.update(status="pending")

  @admin.action(description="Mark selected as in progress")
  def make_in_progress(self, request, queryset):
      queryset.update(status="in_progress")

  @admin.action(description="Mark selected as canceled")
  def make_canceled(self, request, queryset):
      queryset.update(status="canceled")

  actions = ['make_pending', 'make_in_progress', 'make_completed', 'make_canceled']


class TierAdmin(admin.ModelAdmin):
  list_display = ['name', 'price', 'description']


class ExampleImageAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = ['instagram_id', 'url', 'created']

    @button()
    def pull_images(self, request):

        state = get_random_string(length=32)
        request.session['oauth_state'] = state

        # Instagram OAuth
        instagram_auth_url = "https://api.instagram.com/oauth/authorize"
        params = {
            "client_id": settings.INSTAGRAM_APP_ID,
            "redirect_uri": request.build_absolute_uri(reverse('instagram_callback')),
            "scope": "user_profile,user_media",
            "state": state,
            "response_type": "code"
        }
        auth_url = f"{instagram_auth_url}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"

        return redirect(auth_url)

admin.site.register(Order, OrderAdmin)
admin.site.register(Tier, TierAdmin)
admin.site.register(Set, SetAdmin)
admin.site.register(ExampleImage, ExampleImageAdmin)
admin.site.register(SetImage)
