from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime
from rest_framework.response import Response
from django_main.serializers import EventSerializer, CategorySerializer
from apo.models import Category
from rest_framework.decorators import api_view, authentication_classes, permission_classes


def home(request):
    return render(request, 'viteapp/index.html')

def logout_view(request):
    logout(request)
    return redirect("/")

class BaseValidationView(APIView):
    def validate_date_range(self, data):
        errors = []
        try:
            start_time = datetime.fromisoformat(data.get('dateTimeRange').get('start'))
            end_time = datetime.fromisoformat(data.get('dateTimeRange').get('end'))
            if start_time >= end_time:
                errors.append("End time must be after start time.")
            if start_time <= datetime.now():
                errors.append("Event date range must be in the future.")
        except Exception as e:
            errors.append("Invalid date format.")
        return errors
    def format_errors(self, errors):
        error_messages = []
        for field, error_list in errors.items():
            if isinstance(error_list, list):
                for error in error_list:
                    error_messages.append(f"{field}: {str(error)}")
            else:
                error_messages.append(f"{field}: {str(error_list)}")
        return " ".join(error_messages)
    
@api_view(['POST'])
def add_category(request):
    data = request.data
    category_serializer = CategorySerializer(data=data)
    if category_serializer.is_valid():
        category_serializer.save()
        return Response(category_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    category_serializer = CategorySerializer(categories, many=True)
    return Response(category_serializer.data, status=status.HTTP_200_OK)
    
class CreateEventView(BaseValidationView):
    def post(self, request):
        data = request.data
        print(data)
        event_serializer = EventSerializer(data=data)
        print(event_serializer)

        if event_serializer.is_valid():
            print("event serializer is valid")
            event_serializer.save()
            print("event saved")
            return Response("Passed", status=status.HTTP_201_CREATED)
        else:
            
            formatted_errors = self.format_errors(event_serializer.errors)
            print(formatted_errors)
            return Response({'detail': formatted_errors}, status=status.HTTP_400_BAD_REQUEST)
        