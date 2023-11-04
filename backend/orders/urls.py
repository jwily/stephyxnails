from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('api/orders/', views.OrderCreate.as_view()),
    path('api/tiers/', views.TierList.as_view()),
    path('api/exampleimages/', views.ExampleImageList.as_view())
]

# urlpatterns = format_suffix_patterns(urlpatterns)
