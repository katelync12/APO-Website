from rest_framework import serializers
from django.contrib.auth.models import User

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