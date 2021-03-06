from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.
from account.models import Account 

class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'date_joined', 'is_admin', 'is_staff', 'is_normal')
    search_fields = ('email', 'username')
    readonly_fields = ('id', 'date_joined')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Account, AccountAdmin)