# Generated by Django 3.2.4 on 2024-06-29 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apo', '0003_auto_20240608_1951'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='date',
        ),
        migrations.AlterField(
            model_name='event',
            name='location',
            field=models.TextField(),
        ),
        migrations.DeleteModel(
            name='Location',
        ),
    ]
