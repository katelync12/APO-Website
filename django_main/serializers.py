from rest_framework import serializers
from django.contrib.auth.models import User
from apo.models import Shift, Event, Category, Recurrence
from django.utils import timezone

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
        if data['signup_lock'] > data['signup_close']:
            raise serializers.ValidationError("Sign Up lock time must be before Sign Up close time.")
        shifts_data = self.initial_data.get('shifts', [])
        if not shifts_data:
            raise serializers.ValidationError("An event must have at least one shift.")
        
        return data