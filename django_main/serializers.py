from rest_framework import serializers
from django.contrib.auth.models import User
from apo.models import Shift, Event

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if data['email'] != data['username']:
            raise serializers.ValidationError("email must match username")
        return data
    
class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['name', 'capacity', 'start_time', 'end_time']
    def validate(self, data):
        print("shift validated!")
        return data
        
    
class EventSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True)
    start_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    end_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    signup_lock = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    signup_close = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")
    class Meta:
        model = Event
        fields = ['title', 'description', 'start_time', 'end_time', 'signup_lock', 'signup_close', 'event_coordinator', 'location', 'categories', 'shifts']
    
    def create(self, validated_data):
        shifts_data = validated_data.pop('shifts')
        event = Event.objects.create(**validated_data)
        for shift_data in shifts_data:
            Shift.objects.create(event=event, **shift_data)
        return event
    
    def validate(self, data):
        return data