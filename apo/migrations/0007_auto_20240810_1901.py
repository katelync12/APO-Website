# Generated by Django 3.2.4 on 2024-08-10 19:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apo', '0006_remove_event_event_coordinator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='personal_email',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='school_email',
        ),
    ]
