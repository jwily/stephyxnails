from django.contrib import admin
from django.forms import Textarea
from django.db import models
from .models import Order, Set, Tier, SetImage, ExampleImage, STATUS_CHOICES

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
  list_display = ['id', 'name', 'email', 'instagram', 'status', 'created', 'updated']
  actions=[]

  @admin.action(description="Mark selected orders as pending")
  def make_pending(self, request, queryset):
    queryset.update(status='pending')

  @admin.action(description="Mark selected orders as in progress")
  def make_completed(self, request, queryset):
    queryset.update(status='in_progress')

  @admin.action(description="Mark selected orders as completed")
  def make_completed(self, request, queryset):
    queryset.update(status='completed')

  @admin.action(description="Mark selected orders as canceled")
  def make_completed(self, request, queryset):
    queryset.update(status='canceled')

class TierAdmin(admin.ModelAdmin):
  list_display = ['name', 'price', 'description']

admin.site.register(Order, OrderAdmin)
admin.site.register(Tier, TierAdmin)
admin.site.register(Set, SetAdmin)
