# Generated by Django 3.2.4 on 2024-07-14 04:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apo', '0005_auto_20240713_1613'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_coordinator',
        ),
    ]
