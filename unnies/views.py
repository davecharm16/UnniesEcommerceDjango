import random
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, permission_required
from products.models import Product, ImageModelProduct
from userauth.models import Profile
from django.core.paginator import Paginator
from django.http import JsonResponse
from cart.models import Cart
from cart.forms import CartForm
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
    if request.is_ajax():
        if request.method == 'POST':
            total_price = product.price*int(request.POST.get('qty'))
            product_qty = int(request.POST.get('qty'))
            cart_prod = Cart(user =request.user, product = product, total_price = total_price, product_qty = product_qty)
            cart_prod.save()
           

    return render(request, 'unnies/view.html', context)



@login_required(login_url="/login/")
def view_profile(request):
    # print(request.user)
    try:
        profile = Profile.objects.all().get(user=request.user)
    except:
        return redirect('home')
        #TODO: add some functionality in here, to tell admin to open regular account
    
    # print(profile.name)
    context = {
        'profile':profile,
    }
    return render(request, 'unnies/profile.html', context)

@login_required(login_url="/login/")
def cart(request):
    cart_products = Cart.objects.all().filter(user=request.user)
    print(cart_products)

    if request.is_ajax():
        if request.method == "POST":
            id = int(request.POST.get('prod_id'))
            c_product = Cart.objects.get(id=id)
            try:
                if(c_product.product_qty + 1 < c_product.product.stocks):
                    c_product.product_qty +=1
                    c_product.total_price = c_product.product_qty * c_product.product.price
                    c_product.save()
                    return JsonResponse({'success':'success', 'prod_qty': c_product.product_qty }, status = 200)
            except:
                return JsonResponse({'success':'error', 'prod_qty': c_product.product_qty }, status = 200)
                

    context = {
        'cart_products':cart_products, 
    }
    return render(request, 'unnies/cart.html', context)
