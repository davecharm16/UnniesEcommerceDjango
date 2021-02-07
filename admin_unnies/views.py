from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import RegistrationForm
from account.models import Account
from products.models import Product, ImageModelProduct
from products.forms import ProductForm, ImageForm
from django.forms import modelformset_factory
from django.contrib import messages
# Create your views here.

def adminView(request):
    admins = Account.objects.filter(is_admin = True, is_superuser = False)
    product = Product.objects.all()
    images = ImageModelProduct.objects.all()
    ImageFormset = modelformset_factory(ImageModelProduct,form = ImageForm, extra = 4)
    formset = ImageFormset(queryset=ImageModelProduct.objects.none())
    context =  {
        'admins': admins, 
        'products':product, 
        'images': images,
        'prod_form': ProductForm(),
        'formset':formset,
        'error' : formset.errors
        }
    return render(request, 'admin_unnies/adminDashboard.html', context);


def addProduct(request):
    ImageFormset = modelformset_factory(ImageModelProduct,form = ImageForm, extra = 4)
    prod_form = ProductForm(request.POST)
    if request.method =='POST':
        formset = ImageFormset(request.POST or None, request.FILES,queryset=ImageModelProduct.objects.none())
        if formset.is_valid() and prod_form.is_valid():
            product = prod_form.save()
            print(formset.cleaned_data)
            for form in formset.cleaned_data:
                print(form)
                if form:
                    image = form['image']
                    photo = ImageModelProduct(product = product, image = image)
                    photo.save()
        else:
            print(formset.errors)
            print(prod_form.errors)
        return redirect('adminView')
    return render(request, 'admin_unnies/adminDashboard.html', { });




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
