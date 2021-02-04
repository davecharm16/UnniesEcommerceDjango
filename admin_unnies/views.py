from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import RegistrationForm
from account.models import Account
from products.models import Product, ImageModelProduct
from products.forms import ProductForm, ImageForm
from django.forms import modelformset_factory
# Create your views here.

def adminView(request):
    admins = Account.objects.filter(is_admin = True, is_superuser = False)
    product = Product.objects.all()
    images = ImageModelProduct.objects.all()
    Imageformset = modelformset_factory(ImageModelProduct,fields=('image',), extra = 3)
    formset = Imageformset(queryset = ImageModelProduct.objects.none())
    context =  {
        'admins': admins, 
        'products':product, 
        'images': images,
        'prod_form': ProductForm(),
        'imageform':formset,
        }
    return render(request, 'admin_unnies/adminDashboard.html', context);


def addProduct(request):
    




def adminUnniesLogin(request):
    if request.method == 'GET':
        return render(request, 'admin_unnies/adminlogin.html', {})
    else:
        user = authenticate(username = request.POST['username'], password = request.POST['password'])
        if user is not None:
            if user.is_superuser or user.is_admin:
                login(request, user)
                return redirect('adminView')
            else:
                return render(request, 'admin_unnies/adminlogin.html', {'error': 'Do not have access'})
        else:
            return render(request, 'admin_unnies/adminlogin.html', {'error': 'Password did not match'})


def registerAdmin(request):
    admins = Account.objects.filter(is_admin = True, is_superuser = False)
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = Account.objects.create_admin(username = request.POST['username'], email = request.POST['email'], password = request.POST['password1'])
            user.save()
            return redirect('adminView')
        else:
            return render(request, 'admin_unnies/adminDashboard.html', {'registration_form': form, 'admins': admins})
    return render(request, 'admin_unnies/adminDashboard.html', {'registration_form': form, 'admins': admins})


# def addProduct(request):
