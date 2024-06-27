from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime
from rest_framework.response import Response
from django_main.serializers import EventSerializer


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

class CreateEventView(BaseValidationView):
    def post(self, request):
        data = request.data
        errors = self.validate_event_data(data)
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        event_serializer = EventSerializer(data=data)
        if event_serializer.is_valid():
            event_serializer.save()
            return Response(event_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def validate_event_data(self, data):
        errors = []
        errors.extend(self.validate_date_range(data))
        # get the shifts
        errors.extend(self.validate_shifts(data['shifts']))
        return errors

    def validate_shifts(self, shifts):
        errors = []
        counter = 1
        for shift in shifts:
            try:
                shift_start = datetime.fromisoformat(shift.get('start'))
                shift_end = datetime.fromisoformat(shift.get('end'))
                if shift_start >= shift_end:
                    errors.append(f"Shift {counter}'s end time must be after start time.")
                if not shift_start or not shift_end:
                    errors.append(f"Shift {counter}'s times cannot be blank.")
                if shift_start <= datetime.now():
                    errors.append("Shift {counter} must be in the future.")
            except Exception as e:
                errors.append("Invalid shift date format.")
        return errors