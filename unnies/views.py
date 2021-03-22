from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from products.models import Product, ImageModelProduct
# Create your views here.
@login_required(login_url='/login/')
def home(request):
    featured = Product.objects.all().filter(is_featured = True)
    images = ImageModelProduct.objects.all()
    context = {
        'featured': featured,
        'images': images
    }
    return render(request, 'unnies/index.html', context)
