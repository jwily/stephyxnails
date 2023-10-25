from django.contrib import admin
from .models import Order, Set, Tier, SetImage, ExampleImage

# Register your models here.

class SetInline(admin.TabularInline):
  model = Set
  extra = 1

class OrderAdmin(admin.ModelAdmin):
  inlines = [SetInline]

admin.site.register(Order, OrderAdmin)
admin.site.register(Set)
