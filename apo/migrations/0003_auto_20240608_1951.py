# Generated by Django 3.2.4 on 2024-06-08 19:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apo', '0002_auto_20240602_1859'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='role',
            name='permissions',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='roles',
        ),
        migrations.DeleteModel(
            name='Permission',
        ),
        migrations.DeleteModel(
            name='Role',
        ),
    ]
