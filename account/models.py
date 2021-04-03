from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager 

# Create your models here.

class MyAccountManager(BaseUserManager):

    def create_user(self, email,username, password=None):
        if not email:
            raise ValueError("User must have an email Address")
        if not username:
            raise ValueError("User must have a Username")
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_admin (self, email,username, password=None):
        if not email:
            raise ValueError("User must have an email Address")
        if not username:
            raise ValueError("User must have a Username")
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.is_admin  = True
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
        )
        user.is_admin  = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using = self.db)
        return user

class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email",max_length=60,unique=True)
    username = models.CharField(max_length=30, unique = True)
    date_joined = models.DateField(verbose_name="date joined", auto_now_add=True)
    is_normal = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_active = models.BooleanField(default =True)
    is_superuser = models.BooleanField(default = False)
    hide_email = models.BooleanField(default=True)

    objects = MyAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def has_perm(self, perm,obj=None):
        return self.is_admin

    def has_perms(self, perm,obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True


