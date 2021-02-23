from django.db import models

# Create your models here.


class Product(models.Model):
    types = [
        ('Album', 'Album'),
        ('Merchandise','Merchandise' ),
        ('Photobook', 'Photobook'),
        ('Fan lights', 'Fan lights'),
        ('Accessories', 'Accessories'),
    ]
    title = models.CharField(max_length=200)
    product_type = models.CharField(max_length=50, choices = types, default = 'Merchandise')
    description = models.TextField(blank= True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default = 0)
    stocks = models.PositiveIntegerField(default = 0)
    is_active = models.BooleanField(default = True)
    is_featured = models.BooleanField(default = False)
    rating = models.IntegerField(blank = True, null = True)
    sold = models.PositiveIntegerField(blank = True, default = 0)
    # image = models.ImageField(upload_to=None, height_field=None, width_field=None)

    def __str__(self):
        return self.title
    


class Variation(models.Model):
    product_var = models.ForeignKey("Product", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    product_type = models.CharField(max_length=50)
    description = models.TextField(blank= True)
    stocks = models.PositiveIntegerField(default = 0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default = 0)
    is_active = models.BooleanField(default = True)
    rating = models.IntegerField(blank = True, null =True)
    sold = models.PositiveIntegerField(blank = True, default = 0)

    

class ImageModelProduct(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="media/product/", height_field=None)

    def __str__(self):
        return self.product.title
    

