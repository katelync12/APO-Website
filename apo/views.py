from django.shortcuts import render, redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework import status, generics
from datetime import datetime
from rest_framework.response import Response
from django_main.serializers import EventSerializer, CategorySerializer, RequirementSerializer, UserProfileSerializer
from apo.models import *, Requirement, Event, Shift
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from dateutil import parser
from django.shortcuts import get_object_or_404
from datetime import timedelta
import logging
from django.core.files.base import ContentFile
import base64
from django.core.files.uploadedfile import InMemoryUploadedFile
from phonenumber_field.phonenumber import PhoneNumber
from django.conf import settings
logger = logging.getLogger(__name__)

def home(request):
    return render(request, 'viteapp/index.html')

def logout_view(request):
    logout(request)
    return redirect("/")


class CreateUserProfile(APIView):
    def post(self, request):
        user = request.user

        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            data = request.data
            user.first_name = request.data.get('firstName', user.first_name)
            user.last_name = request.data.get('lastName', user.last_name)
            user.save()
            UserProfile.objects.create(
                user=user,
                middle_name=data.get('middleName'),
                discord_username=data.get('discordUsername'),
                phone_number=data.get('phoneNumber'),
                birthday=data.get('birthday'),
                pronouns=data.get('pronouns'),
                dietary_restrictions=data.get('dietaryRestrictions'),
                additional_info=data.get('additionalInfo'),
                profile_picture=request.FILES.get('profilePicture', None)
            )

            return Response({'detail': 'User profile created/updated successfully.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'detail': 'An error occurred while creating/updating the user profile.'}, status=status.HTTP_400_BAD_REQUEST)
class ContactInfo(APIView):
    def get(self, request):
        # Get the user from the request 
        print(request.user)
        user = request.user

        # Initialize personal info with default values
        contact_info = {
            "phoneNumber": "",
            "discordUsername": "",
        }

        # Try to retrieve the associated UserProfile, if it exists
        try:
            profile = user.profile  # Using the related_name 'profile'
            
            # Update personal info with profile data 
            contact_info.update({
                "phoneNumber": str(profile.phone_number) or "",
                "discordUsername": profile.discord_username or "",
            })
        except UserProfile.DoesNotExist:
            # If the user doesn't have a profile, we use the default values
            pass

        return Response(contact_info, status=status.HTTP_200_OK)
    def post(self, request):
        user = request.user

        # Check if UserProfile exists
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"message": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)


        # Update UserProfile model fields
        user_profile.phone_number = request.data.get("phoneNumber", user_profile.phone_number)
        user_profile.discord_username = request.data.get("discordUsername", user_profile.discord_username)
       
        user_profile.save()

        return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)

class ProfileInfo(APIView):
    def get(self, request):
        # Get the user from the request 
        print(request.user)
        user = request.user

        # Initialize personal info with default values
        personal_info = {
            "firstName": user.first_name,
            "middleName": "",
            "lastName": user.last_name,
            "birthday": "",
            "pronouns": "",
            "dietaryRestrictions": "",
            "additionalInfo": "",
            "profilePicture": None,
        }

        # Try to retrieve the associated UserProfile, if it exists
        try:
            profile = user.profile  # Using the related_name 'profile'
            
            # Update personal info with profile data 
            personal_info.update({
                "middleName": profile.middle_name or "",
                "birthday": profile.birthday or "",
                "pronouns": profile.pronouns or "",
                "dietaryRestrictions": profile.dietary_restrictions or "",
                "additionalInfo": profile.additional_info or "",
                "profilePicture": f"{settings.MEDIA_URL}{profile.profile_picture}" if profile.profile_picture else None,
            })
            print(personal_info)
        except UserProfile.DoesNotExist:
            # If the user doesn't have a profile, we use the default values
            pass

        return Response(personal_info, status=status.HTTP_200_OK)
    def post(self, request):
        user = request.user

        # Check if UserProfile exists
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"message": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Update User model fields
        user.first_name = request.data.get("firstName", user.first_name)
        user.last_name = request.data.get("lastName", user.last_name)
        user.save()

        # Update UserProfile model fields
        user_profile.middle_name = request.data.get("middleName", user_profile.middle_name)
        user_profile.birthday = request.data.get("birthday", user_profile.birthday)
        user_profile.pronouns = request.data.get("pronouns", user_profile.pronouns)
        user_profile.dietary_restrictions = request.data.get("dietaryRestrictions", user_profile.dietary_restrictions)
        user_profile.additional_info = request.data.get("additionalInfo", user_profile.additional_info)

        if "profilePicture" in request.FILES:
            user_profile.profile_picture = request.FILES["profilePicture"]
        else:
            user_profile.profile_picture = None

        user_profile.save()

        return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)

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

class CreateProfileView(APIView):
    def post(self, request):
        print(request.data)
        data = request.data
        profile_serializer = UserProfileSerializer(data=data)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response("Passed", status=status.HTTP_201_CREATED)
        else:
            print("Failed")
            formatted_errors = self.format_errors(profile_serializer.errors)
            return Response({'detail': formatted_errors}, status=status.HTTP_400_BAD_REQUEST)
        
    def format_errors(self, errors):
        formatted_errors = []
        for field, field_errors in errors.items():
            formatted_errors.append(field_errors)
        return formatted_errors


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
    from apo.models import Event
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

@api_view(['GET'])
def get_calendar_events(request):
    try:
        # Get the start_date and end_date from the query parameters

        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        # Parse the dates
        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None
        #print("end query params")
        # print(f"start_date: {start_date}")
        # print(f"end_date: {end_date}")
        
        if start_date and end_date:
            # start_date = timezone.make_aware(start_date, timezone.utc)
            # end_date = timezone.make_aware(end_date, timezone.utc)
            
            events = Event.objects.filter(start_time__gte=start_date, end_time__lte=end_date)

        else:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        events_data = [
            {
                "id": event.id,
                "title": event.title,
                "start": event.start_time.isoformat(),
                "end": event.end_time.isoformat(),
                "description": event.description,
                "categories": event.categories.values_list('id', flat=True),
            }
            for event in events
        ]
        #print("done with event_data")
        # print(f"events_data: {events_data}")
        # logger.debug(f"Events data: {events_data}")
        
        return Response(events_data, status=status.HTTP_200_OK)
    except ValueError:
        return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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