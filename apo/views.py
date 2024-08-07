from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework import status, generics
from datetime import datetime
from rest_framework.response import Response
from django_main.serializers import EventSerializer, CategorySerializer, RequirementSerializer
from apo.models import Category, Recurrence, Requirement
from django.utils import timezone
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from dateutil import parser
from django.shortcuts import get_object_or_404
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

@api_view(['DELETE'])
def delete_event(request):
    try:
        data = request.data
        # Extract id and delete_recurring from JSON body
        id = data.get('id')
        print(id)
        event = get_object_or_404(Event, id=id)
        delete_recurring = request.data.get('delete_recurring', False)

        if delete_recurring and event.recurrence:
            # Delete all events with the same recurrence ID
            Event.objects.filter(recurrence=event.recurrence).delete()
            return Response({"detail": "Recurring events deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        else:
            # Delete the single event
            event.delete()
            return Response({"detail": "Event deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        print(e)
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_event(request):
    event_id = request.GET.get('id')
    if not event_id:
        return Response({"error": "Event ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        event = Event.objects.get(id=event_id)
        shifts = Shift.objects.filter(event=event)
        event_data = {
            "title": event.title,
            "description": event.description,
            "start_time": event.start_time.isoformat(),
            "end_time": event.end_time.isoformat(),
            "location": event.location,
            "signup_close": event.signup_close.isoformat() if event.signup_close else None,
            "signup_lock": event.signup_lock.isoformat() if event.signup_lock else None,
            "driving": event.driving,
            "categories": [category.id for category in event.categories.all()],
            "shifts": [
                {
                    "id": shift.id,
                    "name": shift.name,
                    "capacity": shift.capacity,
                    "start_time": shift.start_time.isoformat(),
                    "end_time": shift.end_time.isoformat(),
                }
                for shift in shifts
            ],
            "recurrence": event.recurrence.id if event.recurrence else None
        }
        return Response(event_data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    
class CreateEventView(APIView):
    def post(self, request):
        print(request.data)
        data = request.data
        recurrence_interval = data.get('recurrence_interval')
        days_of_week = data.get('days_of_week')
        week_interval = data.get('week_interval')
        
        recurrence_end = data.get('recurrence_end')
        
        if week_interval and recurrence_end and days_of_week:
            week_interval = int(week_interval)
            recurrence_end = parser.isoparse(recurrence_end)

            print("recurring event")
            if week_interval <= 0:
                return Response({"detail": "Recurrence interval must be greater than 0."}, status=status.HTTP_400_BAD_REQUEST)
            if not days_of_week:
                return Response({"detail": "At least a day must be specified"}, status=status.HTTP_400_BAD_REQUEST)
            if recurrence_end <= parser.isoparse(data.get('start_time')):
                return Response({"detail": "Recurrence end must be past start date."}, status=status.HTTP_400_BAD_REQUEST)
            start_day_of_week = (parser.isoparse(data.get('start_time')).weekday() + 1) % 7  # Adjust to match your days_of_week values
            if start_day_of_week not in days_of_week:
                return Response({"detail": "The event must be included in the recurring days of the week"}, status=status.HTTP_400_BAD_REQUEST)

            return self.create_recurring_events(data, week_interval, days_of_week, recurrence_end)
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
            print("Failed")
            formatted_errors = self.format_errors(event_serializer.errors)
            return Response({'detail': formatted_errors}, status=status.HTTP_400_BAD_REQUEST)

    def create_recurring_events(self, data, week_interval, days_of_week, recurrence_end):
        recurrence = Recurrence.objects.create()
        print(recurrence.id)
        data['recurrence'] = recurrence.id

        try:
            start_time = parser.isoparse(data['start_time'])
            end_time = parser.isoparse(data['end_time'])
            signup_lock = parser.isoparse(data['signup_lock'])
            signup_close = parser.isoparse(data['signup_close'])
            week_interval = timedelta(weeks=week_interval)

            shifts = data.get('shifts', [])
            parsed_shifts = []
            for shift in shifts:
                shift_start_time = parser.isoparse(shift['start_time'])
                shift_end_time = parser.isoparse(shift['end_time'])
                parsed_shifts.append({
                    'name': shift.get('name', ''),
                    'capacity': shift.get('capacity', -1),
                    'start_time': shift_start_time,
                    'end_time': shift_end_time
                })

            current_date = start_time
            while current_date <= recurrence_end:
                for day in days_of_week:
                    diff = (day - (current_date.weekday() + 1) % 7) % 7
                    next_date = current_date + timedelta(days=diff)
                    if next_date > recurrence_end:
                        continue
                    
                    event_data = data.copy()
                    event_data['start_time'] = next_date.isoformat()
                    event_data['end_time'] = (next_date + (end_time - start_time)).isoformat()
                    event_data['signup_lock'] = (next_date + (signup_lock - start_time)).isoformat()
                    event_data['signup_close'] = (next_date + (signup_close - start_time)).isoformat()
                    event_data['shifts'] = [
                        {
                            'name': shift['name'],
                            'capacity': shift['capacity'],
                            'start_time': (next_date + (shift['start_time'] - start_time)).isoformat(),
                            'end_time': (next_date + (shift['end_time'] - start_time)).isoformat()
                        }
                        for shift in parsed_shifts
                    ]
                    print(event_data)
                    response = self.create_single_event(event_data)
                    if response.status_code != status.HTTP_201_CREATED:
                        return response

                current_date += week_interval

            return Response("Recurring events created", status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

       
    def format_errors(self, errors):
        formatted_errors = []
        for field, field_errors in errors.items():
            formatted_errors.append(field_errors)
        return formatted_errors
    
class RequirementsListView(generics.ListAPIView):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer