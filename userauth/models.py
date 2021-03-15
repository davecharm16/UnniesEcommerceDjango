from account.models import Account
from django.db import models
# Create your models here.



class Profile(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE)
    address = models.CharField(blank = False, max_length = 250)
    phone = models.DecimalField(max_digits=13, decimal_places=0, blank = False,)


    def __str__(self):
        return self.user.username

