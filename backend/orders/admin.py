from django.db import models
from django.urls import reverse
from django.conf import settings
from django.contrib import admin
from django.forms import Textarea
from django.shortcuts import redirect

from django.utils.html import format_html
from django.utils.crypto import get_random_string

from admin_extra_buttons.api import ExtraButtonsMixin, button
from .models import Order, Set, Tier, SetImage, ExampleImage, STATUS_CHOICES
from .aws import remove_file_from_s3

# Register your models here.

class SetInline(admin.StackedInline):
  model = Set
  extra = 0

  def images_display(self, obj):
    images_html = '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">'

    styling = [
      'filter: blur(8px);',
      '-webkit-filter: blur(8px);',
      'max-width: 15rem;',
      'max-height: 15rem;',
      'height: auto;',
      'width: auto;',
    ]

    for image in obj.images.all():
        if image.url:
            images_html += (
            '<a href="{0}" target="_blank" rel="noopener noreferrer">'
            '<img src="{0}" alt="Blurred Preview" style="{1}" />'
            '</a>'
            ).format(image.url, ' '.join(styling))

    images_html += '</div>'

    return format_html(images_html)

  images_display.short_description = 'Inspiration Images'

  readonly_fields = ('estimated_price', 'images_display',)

class SetAdmin(admin.ModelAdmin):
  list_display = ['order', 'short_description', 'shape', 'left_sizes', 'right_sizes', 'tier', 'created', 'updated']

class OrderAdmin(admin.ModelAdmin):
  inlines = [SetInline]
  list_display = ['__str__', 'name', 'email', 'instagram', 'emoji_status', 'created', 'updated']
  list_filter = ('status', 'created')

  @admin.action(description="Mark as 🌱 Pending")
  def make_pending(self, request, queryset):
      queryset.update(status="pending")

  @admin.action(description="Mark as 🌞 In Progress")
  def make_in_progress(self, request, queryset):
      queryset.update(status="in_progress")

  @admin.action(description="Mark as 🌺 Completed")
  def make_completed(self, request, queryset):
      # for instance in queryset:
      #     images = SetImage.objects.filter(set__order=instance)
      #     for image in images:
      #         response = remove_file_from_s3(image.url)
      #         if response:
      #             image.delete()
      queryset.update(status="completed")

  @admin.action(description="Mark as 🍂 Canceled")
  def make_canceled(self, request, queryset):
      # for instance in queryset:
      #     images = SetImage.objects.filter(set__order=instance)
      #     for image in images:
      #         response = remove_file_from_s3(image.url)
      #         if response:
      #             image.delete()
      queryset.update(status="canceled")

  actions = ['make_pending', 'make_in_progress', 'make_completed', 'make_canceled']

  def get_queryset(self, request):
        # Define your custom ordering by specifying the order of your status values
        qs = super().get_queryset(request)
        ordering = models.Case(
            models.When(status='pending', then=1),
            models.When(status='in_progress', then=1),
            models.When(status='completed', then=2),
            models.When(status='canceled', then=3),
            default=4
        )
        return qs.annotate(custom_ordering=ordering).order_by('custom_ordering', '-created')

  def emoji_status(self, obj):
        # You can adjust the colors and the conditions as needed
        status = ''
        if obj.status == 'pending':
            status = '🌱 Pending'
        elif obj.status == 'in_progress':
            status = '🌞 In Progress'
        elif obj.status == 'completed':
            status = '🌺 Completed'
        elif obj.status == 'canceled':
            status = '🍂 Canceled'
        return format_html(
            '<span>{}</span>',
            status
        )

  emoji_status.admin_order_field = 'status'  # Allows column order sorting
  emoji_status.short_description = 'Status'  # Column header

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
admin.site.register(ExampleImage, ExampleImageAdmin)
