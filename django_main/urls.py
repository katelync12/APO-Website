"""django-main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.urls import re_path
from . import authentication_views
from apo import views
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/checkpermission', authentication_views.check_permission),
    #path('accounts/profile/', authentication_views.profile),
    #path("accounts/", include("allauth.urls")),
    re_path('api/signup', authentication_views.signup),
    re_path('api/login', authentication_views.login),
    re_path('api/test_token', authentication_views.test_token),
    re_path('api/create_event', views.CreateEventView.as_view()),
    # path('google-auth/', authentication_views.google_auth_redirect),
    #This acts as a catch-all    
    re_path(r'^.*/$', TemplateView.as_view(template_name='index.html')),
]
