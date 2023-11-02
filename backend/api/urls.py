from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from orders.views import catchall, instagram_callback

"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

urlpatterns = [
    path('admin/instagram_callback/', instagram_callback, name='instagram_callback'),
    # path('admin/sync_images/', sync_images, name='sync_images'),
    path('admin/', admin.site.urls),
    path('', include('orders.urls')),
    re_path(r'', catchall)
]

urlpatterns = format_suffix_patterns(urlpatterns)
