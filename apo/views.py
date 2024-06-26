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
from todo.serializers import UserSerializer

def home(request):
    return render(request, 'viteapp/index.html')

def logout_view(request):
    logout(request)
    return redirect("/")

# @api_view(['POST'])
@csrf_exempt
def create_account(request):
    # serializer = UserSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     user = User.objects.get(email=request.data['email'])
    #     user.set_password("testpassword")
    #     user.save()
    #     token = Token.objects.create(user=user)
    #     return Response({'token': token.key, 'user': serializer.data})
    # return Response(serializer.errors, status=status.HTTP_200_OK)


    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            user = User(email=email)
            user.set_password("testpassword")
            print(user.password)
            user.save()

            return JsonResponse({'message': 'Account created successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)