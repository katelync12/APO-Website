from rest_framework import serializers
from django.contrib.auth.models import User
from ..apo.models import Shift

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
        fields = ['start_time', 'end_time', 'max_signups']
    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if data['email'] != data['username']:
            raise serializers.ValidationError("email must match username")
        return data
    
class EventSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True)

    class Meta:
        model = Event
        fields = ['title', 'description', 'start_time', 'end_time', 'location', 'signups_lock_time', 'signups_close_time', 'shifts']

    def create(self, validated_data):
        shifts_data = validated_data.pop('shifts')
        event = Event.objects.create(**validated_data)
        for shift_data in shifts_data:
            Shift.objects.create(event=event, **shift_data)
        return event