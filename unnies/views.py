import random
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from products.models import Product, ImageModelProduct
from django.core.paginator import Paginator
# Create your views here.
@login_required(login_url='/login/')
def home(request):
    featured = Product.objects.all().filter(is_featured = True)
    images = ImageModelProduct.objects.all()
    sideContent = list(map(lambda x : x,Product.objects.all()))
    sideContent = random.sample(sideContent, 2)
    context = {
        'featured': featured,
        'images': images,
        'sideContent': sideContent,
    }
    return render(request, 'unnies/index.html', context)

@login_required(login_url='/login/')
def products(request):
    # Get all the Products
    product_types = Product.objects.all().values('product_type').distinct().order_by('product_type')

    #Get the Dropdown list of available types of Products
    product_types = [ p_type['product_type'] for p_type in product_types ]

    #Get Images of the Products
    images = ImageModelProduct.objects.all()

    if request.method == "GET":
        #Get the Type of Product Type
        product_type = request.GET.get('productType')

        if product_type == None or product_type == "All":
            products = Product.objects.all().order_by('title')

        else:
            products = Product.objects.all().filter(product_type = product_type)
            
        paginator = Paginator(products,10)
        page_number = request.GET.get('page')
        if page_number == None:
            page_number = 1
        page_obj = paginator.get_page(page_number)

    context= {
        'selected':product_type,
        'product_types': product_types,
        'page_obj' : page_obj,
        'images': images,
    }
    return render(request, 'unnies/products.html', context)

@login_required(login_url="/login/")
def view_product(request, id):
    product = get_object_or_404(Product, pk = id)
    images = ImageModelProduct.objects.all()
    context = {
        'product': product,
        'images': images,
    }
    return render(request, 'unnies/view.html', context)


@login_required(login_url="/login/")
def view_profile(request):
    context = {}
    return render(request, 'unnies/profile.html', context)
