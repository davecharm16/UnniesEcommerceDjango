from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from .forms import RegistrationForm
from account.models import Account
from products.models import Product, ImageModelProduct
from products.forms import ProductForm, ImageForm
from django.forms import modelformset_factory, inlineformset_factory
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required, permission_required

# Create your views here.
@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
def adminView(request):
    admins = Account.objects.filter(is_admin = True, is_superuser = False)
    product = Product.objects.all().order_by('title')
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

@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
def viewProduct(request):
    product = Product.objects.all().order_by('title')
    images = ImageModelProduct.objects.all()
    context = {
        'products': product,
        'images': images,
    }
    return render(request, 'admin_unnies/getProduct.html', context);

    
@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
def addProduct(request):
    ImageFormset = modelformset_factory(ImageModelProduct,form = ImageForm, extra = 4)
    prod_form = ProductForm(request.POST)
    if request.method =='POST':
        formset = ImageFormset(request.POST or None, request.FILES,queryset=ImageModelProduct.objects.none())
        if formset.is_valid() and prod_form.is_valid():
            imageNull_count = 0
            for form in formset.cleaned_data:
                if form == {}:
                    imageNull_count += 1
            if imageNull_count == 4:
                return JsonResponse({'error': "need to upload at least 1 photo"}, status = 200)
            product = prod_form.save()
            print(formset.cleaned_data)
            for form in formset.cleaned_data:
                print(form)
                if form:
                    image = form['image']
                    photo = ImageModelProduct(product = product, image = image)
                    photo.save()
            return JsonResponse({'product': product.title}, status = 200)
        else:
            return JsonResponse({'product_error': prod_form.errors.as_json()}, status = 200)
        return redirect('adminView')
    return render(request, 'admin_unnies/adminDashboard.html', { });

@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
def editProduct(request, id):
    product = get_object_or_404(Product, pk=id)
    product_form = ProductForm(instance = product)
    # images = ImageModelProduct.objects.all()
    ImageFormset = inlineformset_factory(Product, ImageModelProduct, fields=('image',),)
    if request.method == 'POST':
        product = ProductForm(request.POST, instance = product)
        prod = Product.objects.get(pk = id)
        formset = ImageFormset(request.POST, request.FILES, instance = prod)
        if product.is_valid() and formset.is_valid():
            product.save()
            formset.save()
            return redirect('adminView')
        else:
            errors = product.errors
            print(errors)
            return render(request,'admin_unnies/editproduct.html', {'product_form': product_form, 'formset': formset, 'product':product,})
    else:
        formset = ImageFormset(instance = product)
        return render(request,'admin_unnies/editproduct.html', {'product_form': product_form, 'formset': formset, 'product':product,})


@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
def deleteProduct(request, id):
    if request.method == 'POST':
        product = get_object_or_404(Product, pk=id)
        product.delete()
    return redirect('adminView')


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

@login_required(login_url='/adminUnnies/')
@permission_required('account.has_perm', login_url='/adminUnnies/')
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
