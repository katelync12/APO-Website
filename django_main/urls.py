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
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/checkpermission', authentication_views.check_permission),
    #path('accounts/profile/', authentication_views.profile),
    #path("accounts/", include("allauth.urls")),   
    re_path('api/signup', authentication_views.signup),
    re_path('api/login', authentication_views.login),
    re_path('api/test_token', authentication_views.test_token),
    re_path('api/test_user_initialized', authentication_views.check_user_initialized),
    re_path('api/create_event', views.CreateEventView.as_view()),
    re_path('api/create_profile', views.CreateProfileView.as_view()),
    re_path('api/create_user_profile', views.CreateUserProfile.as_view()),
    re_path('api/add_category', views.add_category),
    re_path('api/get_categories', views.get_categories),
    re_path('api/contact_info', views.ContactInfo.as_view()),
    re_path('api/change_password', authentication_views.change_password), 
    re_path('api/profile_info', views.ProfileInfo.as_view()),
    path('api/requirements', views.RequirementsListView.as_view()),
    path('api/get_event/', views.get_event),
    path('api/delete_event/', views.delete_event),
    path('api/get_calendar_events/', views.get_calendar_events),
    # path('google-auth/', authentic at    ion_views.google_auth_redirect),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Append the catch-all pattern to urlpatterns
urlpatterns += [
    re_path(r'^.*/$', TemplateView.as_view(template_name='index.html')),
]