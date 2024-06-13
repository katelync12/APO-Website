"""todo URL Configuration

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
from students_api import views
from django.urls import re_path
from . import authentication_views
from django.conf.urls import include

urlpatterns = [
    path('checkpermission', authentication_views.check_permission),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/students/', views.student, name='student-handler'),
    path("accounts/", include("allauth.urls")),
    re_path('signup', authentication_views.signup),
    re_path('login', authentication_views.login),
    re_path('test_token', authentication_views.test_token),
    # path('google-auth/', authentication_views.google_auth_redirect),
    #This acts as a catch-all
    re_path(r'^.*/$', TemplateView.as_view(template_name='index.html')),
]
