# Generated by Django 3.1.5 on 2021-03-08 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='address',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone',
            field=models.DecimalField(decimal_places=0, max_digits=13),
        ),
    ]