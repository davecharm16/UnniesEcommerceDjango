# Generated by Django 3.1.5 on 2021-03-01 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_normal',
            field=models.BooleanField(default=False),
        ),
    ]
