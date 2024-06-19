from django.shortcuts import render, redirect

# Create your views here.
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
from .serializers import UserSerializer

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.groups.add(get_or_create_default_group())
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

def get_or_create_default_group():
    # Get or create the group
    group, created = Group.objects.get_or_create(name='Default')

    # Get or create the permission
    content_type = ContentType.objects.get_for_model(Group)  # You can change this to any model you want to associate the permission with
    permission, perm_created = Permission.objects.get_or_create(
        codename='default',
        name='Default Permission',
        content_type=content_type,
    )

    # Add the permission to the group
    if not group.permissions.filter(id=permission.id).exists():
        group.permissions.add(permission)

    return group

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def check_permission(request):
    permission_name = request.GET.get('permission')
    print(permission_name)
    if not permission_name:
        print("Permission name not provided.")
        return Response({'detail': 'Permission name not provided.'}, status=400)

    user = request.user

    # Check if the user has the specified permission
    has_permission = user.has_perm(permission_name)

    if has_permission:
        print("User has the permission.")
        return Response("passed")
    else:
        print("User does not have the permission.")
        return Response({'detail': 'User does not have the permission.'}, status=403)

# @api_view(['GET'])
# def google_auth_redirect(request):
#     return redirect('/accounts/google/login/')