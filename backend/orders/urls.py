from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    # path('api/orders/', views.OrderList.as_view()),
    path('api/orders/', views.OrderCreate.as_view()),
    path('api/orders/<int:pk>/', views.OrderDetail.as_view()),
    path('api/sets/', views.SetList.as_view()),
    path('api/sets/<int:pk>/', views.SetDetail.as_view()),
    path('api/tiers/', views.TierList.as_view()),
    path('api/setimages/', views.SetImageList.as_view())
]

# urlpatterns = format_suffix_patterns(urlpatterns)
