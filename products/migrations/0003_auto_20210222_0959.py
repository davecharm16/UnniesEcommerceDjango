# Generated by Django 3.1.5 on 2021-02-22 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20210204_1122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_type',
            field=models.CharField(choices=[('Album', 'Album'), ('General Merchandise', 'General Merchandise'), ('Photobook', 'Photobook'), ('Fan lights', 'Fan lights'), ('Accessories', 'Accessories')], default='General Merchandise', max_length=50),
        ),
    ]
