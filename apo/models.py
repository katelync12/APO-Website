from django.db import models
# Create your modelsfrom django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import Group

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    school_email = models.EmailField(unique=True)
    personal_email = models.EmailField(unique=True)
    discord_username = models.CharField(max_length=50)
    phone_number = PhoneNumberField()
    birthday = models.DateField()
    pronouns = models.CharField(max_length=50, null=True, blank=True)
    dietary_restrictions = models.TextField(null=True, blank=True)
    additional_info = models.TextField(null=True, blank=True)
    profile_picture = models.BinaryField()
    membership = models.ForeignKey('Membership', on_delete=models.SET_NULL, null=True, blank=True)

class Membership(models.Model):
    name = models.CharField(max_length=50, unique=True)
    requirements = models.ManyToManyField('Requirement')

class Location(models.Model):
    street_num = models.IntegerField()
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.IntegerField()

class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField()
    signup_lock = models.DateTimeField()
    signup_close = models.DateTimeField()
    event_coordinator = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    categories = models.ManyToManyField('Category')

class Shift(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    capacity = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class SignUp(models.Model):
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_driving = models.IntegerField()  # 0 = self drive, -1 = need help, 1+ = can drive this many people
    time_signed_up = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)

class Requirement(models.Model):
    hours = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
