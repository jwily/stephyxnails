from django.contrib import admin
from api.admin import admin_site
from django.forms import Textarea
from django.db import models
from django.http import HttpResponse
from admin_extra_buttons.api import ExtraButtonsMixin, button
from .models import Order, Set, Tier, SetImage, ExampleImage, STATUS_CHOICES
from django.conf import settings
from django.urls import reverse
import requests
from django.shortcuts import redirect

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
    list_display = ['id', 'url', 'created']

    @button()
    def pull_images(self, request):
        # Instagram OAuth
        instagram_auth_url = "https://api.instagram.com/oauth/authorize"
        params = {
            "client_id": settings.INSTAGRAM_APP_ID,
            "redirect_uri": request.build_absolute_uri(reverse('instagram_callback')),
            "scope": "user_profile,user_media",
            "response_type": "code",
        }
        auth_url = f"{instagram_auth_url}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"

        return redirect(auth_url)

        # return HttpResponse("Done")

    # @button()
    # def seed_images(self, request):
    #   response = {'data': [{'id': '18100310311203393', 'caption': 'no filter seoul ‘17.', 'media_type': 'IMAGE', 'media_url': 'https://scontent-sea1-1.cdninstagram.com/v/t51.29350-15/135142033_200815868447878_4686391586164446890_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=uit8OpkVMxAAX_XT25W&_nc_ht=scontent-sea1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDFe9alLLtzwJhyTRqeFE39rV_RVXwFleQ_GUlTYGl9Ng&oe=6546B326', 'username': 'disorientedlion', 'timestamp': '2021-01-05T04:39:39+0000'}, {'id': '17892470956800527', 'caption': 'popped in some batter and out came a moon!', 'media_type': 'IMAGE', 'media_url': 'https://scontent-sea1-1.cdninstagram.com/v/t51.29350-15/136076559_706471336722415_784687072433290876_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=OpucEYbI4qUAX8ZVAXv&_nc_ht=scontent-sea1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBSAbh-zNg162CglqXdLi73W_P6W6yc27i0DjxlgIbsww&oe=6546D810', 'username': 'disorientedlion', 'timestamp': '2021-01-05T04:33:52+0000'}, {'id': '17875501304121218', 'caption': 'baking is self-care. pair with mint tea.', 'media_type': 'IMAGE', 'media_url': 'https://scontent-sea1-1.cdninstagram.com/v/t51.29350-15/130996667_885282652234311_8123295447269187478_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=AsqF6GFr6xYAX-8h2mQ&_nc_oc=AQmwhgJ71oajw142aMXMKTZPADI85KghOYQZ6NdKBupaDtWNe9cPITnTcZvUhnbkm6g&_nc_ht=scontent-sea1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCpUBwUAWziKofPwgks_UGze4HgWF6GppKCfg2WCvK-NA&oe=6546458C', 'username': 'disorientedlion', 'timestamp': '2021-01-05T04:29:55+0000'}], 'paging': {'cursors': {'before': 'QVFIUnNuNWMyMzFHWnktMjRpbUZAWdkFhZAnZAFdUxPcHBqRnJmay1jOGdkQWctV19iYnM3NXcwNjdBOVdDMzlOWmZAOczVmaU1TTVNQZAEphWl9zMHFNMXZAxYi1R', 'after': 'QVFIUm0yYmNocGlaa2xrSE9INVppV0lyMnVQYkhrbnZAZARENlcDhudUQtUVdBSW5FNlJpNjR1T0RsQVRsSC12V3ZATdFRqRVpSM0RBVXY2TTd5MUZAtb1ZAZAYWN3'}}}
    #   data = response['data']
    #   # for post in data:
    #   #   image = ExampleImage(url=post['media_url'])
    #   #   image.save()
    #   all_urls = set([obj.url for obj in ExampleImage.objects.all()])
    #   print(all_urls)

admin.site.register(Order, OrderAdmin)
admin.site.register(Tier, TierAdmin)
admin.site.register(Set, SetAdmin)
admin.site.register(ExampleImage, ExampleImageAdmin)
