from django.db import models
from account.models import Account
from products.models import Product
# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_qty = models.IntegerField(blank = False)
    total_price = models.DecimalField(max_digits=9, decimal_places=2)
    selected = models.BooleanField(default=False)
