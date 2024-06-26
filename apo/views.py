from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
import json
from apo.models import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
import datetime
from phonenumber_field.phonenumber import PhoneNumber
from apo.models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token # type: ignore
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
# from django-main.serializers import UserProfileSerializer
from django.contrib.auth.decorators import login_required


def home(request):
    return render(request, 'viteapp/index.html')

def logout_view(request):
    logout(request)
    return redirect("/")


@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            user = User(username=email, email=email)
            user.set_password("testpassword")
            print(user.password)
            print(user.username)
            print(user.email)
            user.save()

            # role = data.get('role')
            # if role != "Advisor" or role != "Honorary":
            #     pledgeClass = data.get('pledgeClass')
            #     if not pledgeClass:
            #         return JsonResponse({'error': 'pledgeClass is required'}, status=400)

            # profile = UserProfile(user=user)
            # mem = Membership.objects.filter(name=role)
            # if not mem:
            #     return JsonResponse({'error': 'Membership type is not in database'}, status=400)

            # profile.membership = Membership.objects.filter(name=role)

            return JsonResponse({'message': 'Account created successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    




@login_required
def get_profile(request):
    print("View Profile function called")
    user_profile = get_object_or_404(UserProfile, user=request.user)
    serializer = UserProfileSerializer(user_profile)
    return JsonResponse(serializer.data)


@csrf_exempt
@require_http_methods(["PUT"])
@login_required
def update_profile(request):
    user = request.user
    profile = get_object_or_404(UserProfile, user=user)

    data = request.POST.copy()
    profile_picture = request.FILES.get('profilePicture')
    
    if profile_picture:
        profile.profile_picture = profile_picture

    for field in data:
        setattr(profile, field, data[field])
    
    profile.save()
    
    return JsonResponse({"message": "Profile updated successfully"})
