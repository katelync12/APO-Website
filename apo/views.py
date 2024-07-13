from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime
from rest_framework.response import Response
from django_main.serializers import EventSerializer, CategorySerializer
from apo.models import Category, Recurrence
from django.utils import timezone
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from dateutil import parser
from datetime import timedelta


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
    
class CreateEventView(APIView):
    def post(self, request):
        print(request.data)
        data = request.data
        recurrence_interval = data.get('recurrence_interval')
        
        recurrence_end = data.get('recurrence_end')
        
        if recurrence_interval and recurrence_end:
            print("recurring event")
            recurrence_interval = timedelta(days=int(recurrence_interval))
            return self.create_recurring_events(data, recurrence_interval, recurrence_end)
        else:
            print("single event")
            data['recurrence'] = None
            return self.create_single_event(data)

    def create_single_event(self, data):
        
        event_serializer = EventSerializer(data=data)
        if event_serializer.is_valid():
            event_serializer.save()
            return Response("Passed", status=status.HTTP_201_CREATED)
        else:
            formatted_errors = self.format_errors(event_serializer.errors)
            return Response({'detail': formatted_errors}, status=status.HTTP_400_BAD_REQUEST)

    def create_recurring_events(self, data, recurrence_interval, recurrence_end):
        recurrence = Recurrence.objects.create()
        print(recurrence.id)
        data['recurrence'] = recurrence.id
        

        try:
            start_time = parser.isoparse(data['start_time'])
            end_time = parser.isoparse(data['end_time'])
            signup_lock = parser.isoparse(data['signup_lock'])
            signup_close = parser.isoparse(data['signup_close'])
            recurrence_end = parser.isoparse(recurrence_end)

            while start_time <= recurrence_end:
                event_data = data.copy()
                event_data['start_time'] = start_time.isoformat()
                event_data['end_time'] = end_time.isoformat()
                event_data['signup_lock'] = signup_lock.isoformat()
                event_data['signup_close'] = signup_close.isoformat()
                print(event_data)
                self.create_single_event(event_data)

            # Increment the times by the recurrence_interval
                start_time += recurrence_interval
                end_time += recurrence_interval
                signup_lock += recurrence_interval
                signup_close += recurrence_interval

            return Response("Recurring events created", status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    def format_errors(self, errors):
        # Implement your error formatting logic here
        print(errors)
        return errors
        