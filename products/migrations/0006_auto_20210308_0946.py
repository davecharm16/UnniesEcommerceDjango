# Generated by Django 3.1.5 on 2021-03-08 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_product_is_featured'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_type',
            field=models.CharField(choices=[('Album', 'Album'), ('Merchandise', 'Merchandise'), ('Photobook', 'Photobook'), ('Fan lights', 'Fan lights'), ('Accessories', 'Accessories'), ('Pre-orders', 'Pre-orders')], default='Merchandise', max_length=50),
        ),
    ]
