from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from account.models import Account
from .models import Profile
from .forms import RegistrationForm, ProfileForm
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

# Create your views here.


def login(request):
    if request.method == 'POST':
        user = authenticate(username = request.POST['username'], password = request.POST['password'])
        if user is not None:
            auth_login(request, user)
            return render(request, 'userauth/login.html', {'error': 'Yow'})
        else:
            return render(request, 'userauth/login.html', {'error': 'Invalid Username or Password'})
    else:
        return render(request, 'userauth/login.html', {})


def register(request):
    context = {
        'regForm' : RegistrationForm,
        'regFormProfile' : ProfileForm,
    }
    if request.is_ajax():
        if request.method == 'GET':
            response = {}
            username = request.GET.get('username')
            email = request.GET.get('email')
            if username != "":
                try:
                    Account.objects.get(username = username)
                    response['username'] = 'Username Already Exist'
                except:
                    response['username'] = ''
            if email != "":
                try:
                    Account.objects.get(email = email)
                    response['email'] = 'Email is Already Taken'
                except:
                    try:
                        validate_email(email)
                    except ValidationError as e:
                        response['email'] = 'Not a Valid Email'
                    else:
                        response['email'] = ''
            return JsonResponse(response, status = 200)
        else:
            response = {}
            userForm = RegistrationForm(request.POST)
            profileForm = ProfileForm(request.POST)
            if userForm.is_valid() and profileForm.is_valid():
                user = Account.objects.create_admin(username = request.POST['username'], email = request.POST['email'], password = request.POST['password1'])
                print("how dy")
                user.is_normal = True
                user.is_admin = False
                user.save()
                profile = profileForm.save(commit=False)
                profile.user = user
                profile.save()
                return JsonResponse({'success': 'success', 'redirect': '/login' }, status = 200)
            else:
                return JsonResponse({'success': 'fail' ,'user_error': userForm.errors.as_json(), 'profile_error': profileForm.errors.as_json()}, status = 200)
    return render(request, 'userauth/register.html', context)