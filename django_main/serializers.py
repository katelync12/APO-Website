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
        fields = ['start', 'end']
    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        
    
class EventSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True)
    start_time = serializers.DateTimeField(source='dateTimeRange.start')
    end_time = serializers.DateTimeField(source='dateTimeRange.end')
    signups_lock = serializers.DateTimeField(source='lockDate')
    signups_close = serializers.DateTimeField(source='signUpEnd')

    class Meta:
        model = Event
        fields = ['title', 'date', 'start_time', 'end_time', 'description', 'signups_lock', 'signups_close', 'event_coordinator', 'location', 'categories', 'shifts']

    def create(self, validated_data):
        shifts_data = validated_data.pop('shifts')
        event = Event.objects.create(**validated_data)
        for shift_data in shifts_data:
            Shift.objects.create(event=event, **shift_data)
        return event
    
    def validate(self, data):
        return data