from rest_framework import serializers
from django.contrib.auth.models import User
from apo.models import Shift, Event, Category, Recurrence, Requirement, UserProfile, Membership
from django.utils import timezone
from dateutil import parser
from dateutil.parser import parse as parse_datetime

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description']

    def validate(self, data):
        return data
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']

    def validate(self, data):
        """
        Check that the email matches the username
        """
        if data['email'] != data['username']:
            raise serializers.ValidationError("email must match username")
        return data
    
class ShiftSerializer(serializers.ModelSerializer):
    start_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    end_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    class Meta:
        model = Shift
        fields = ['name', 'capacity', 'start_time', 'end_time']
    def validate(self, data):
        now = timezone.now()
        if data['start_time'] <= now:
            raise serializers.ValidationError("Start time must be in the future.")
        if data['end_time'] <= now:
            raise serializers.ValidationError("End time must be in the future.")
        if data['start_time'] > data['end_time']:
            raise serializers.ValidationError("Start time must be before end time.")
        print("shift validated!")
        return data
        
    
class EventSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True)
    start_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    end_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    signup_lock = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    signup_close = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    categories = serializers.ListField(child=serializers.CharField(), write_only=True)
    category_objects = serializers.SerializerMethodField()
    recurrence = serializers.PrimaryKeyRelatedField(queryset=Recurrence.objects.all(), allow_null=True, required=False)
  

    class Meta:
        model = Event
        fields = ['title', 'description', 'start_time', 'end_time', 'signup_lock', 'signup_close', 'location', 'categories', 'category_objects', 'shifts', 'recurrence', 'driving']
    
    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        shifts_data = validated_data.pop('shifts')
        #recurrence_data = validated_data.pop('recurrence', None)
        # print("HELLO! THIS IS VALIDATED DATA")
        # print(validated_data)
        event = Event.objects.create(**validated_data)
        for shift_data in shifts_data:
            Shift.objects.create(event=event, **shift_data)
        # Process categories
        for category_name in categories_data:
            category, created = Category.objects.get_or_create(name=category_name)
            event.categories.add(category)

        #if recurrence_data:
            #event.recurrence = recurrence_data
            #event.save()
        return event
    
    def get_category_objects(self, obj):
        # Get the category names for the event
        return [category.name for category in obj.categories.all()]
    
    def validate(self, data):
        now = timezone.now()
        if data['start_time'] <= now:
            raise serializers.ValidationError("Start time must be in the future.")
        if data['end_time'] <= now:
            raise serializers.ValidationError("End time must be in the future.")
        if data['signup_lock'] <= now:
            raise serializers.ValidationError("Signup lock time must be in the future.")
        if data['signup_close'] <= now:
            raise serializers.ValidationError("Signup close time must be in the future.")
        if data['start_time'] > data['end_time']:
            raise serializers.ValidationError("Start time must be before end time.")
        # not sure if this is correct, check with Katelyn and Andrew
        #if data['signup_lock'] > data['signup_close']:
            #raise serializers.ValidationError("Sign Up lock time must be before Sign Up close time.")
          
        shifts_data = self.initial_data.get('shifts', [])
        if not shifts_data:
            raise serializers.ValidationError("An event must have at least one shift.")

        for shift_data in shifts_data:
            shift_start = shift_data['start_time']
            shift_end = shift_data['end_time']
            shift_start = parse_datetime(shift_data['start_time'])
            shift_end = parse_datetime(shift_data['end_time'])
            if shift_start < data['start_time']:
                raise serializers.ValidationError("Shift start time must be equal or greater than the event start time.")
            if shift_end > data['end_time']:
                raise serializers.ValidationError("Shift end time must be equal or less than the event end time.")
            if shift_end <= shift_start:
                raise serializers.ValidationError("Shift end time must be after start time.")
        
        return data

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['hours', 'category']

    

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    middle_name = serializers.CharField(max_length=50, required=False, allow_blank=True)
    school_email = serializers.EmailField()
    personal_email = serializers.EmailField()
    discord_username = serializers.CharField(max_length=50)
    phone_number = serializers.CharField()
    birthday = serializers.DateField(format="%Y-%m-%d")
    pronouns = serializers.CharField(max_length=50, required=False, allow_blank=True)
    dietary_restrictions = serializers.CharField(required=False, allow_blank=True)
    additional_info = serializers.CharField(required=False, allow_blank=True)
    profile_picture = serializers.ImageField()
    membership = serializers.PrimaryKeyRelatedField(queryset=Membership.objects.all(), allow_null=True, required=False)

    class Meta:
        model = UserProfile
        fields = [
            'user', 'middle_name', 'school_email', 'personal_email', 'discord_username', 
            'phone_number', 'birthday', 'pronouns', 'dietary_restrictions', 'additional_info', 
            'profile_picture', 'membership'
        ]