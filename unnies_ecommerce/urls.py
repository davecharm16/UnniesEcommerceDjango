"""unnies_ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from admin_unnies import views
from django.conf.urls.static import static
from django.conf import settings
from userauth.views import login, register
from unnies.views import home, products, view_product, view_profile, cart

urlpatterns = [
    path('admin/', admin.site.urls),
    #auth
    path('adminUnnies/', views.adminUnniesLogin, name = 'adminUnniesLogin'),
    #own admins
    path('adminUnniesMain/', views.adminView, name = 'adminView'),
    path('addProduct/', views.addProduct, name = 'addProduct'),
    path('adminUnniesMain/viewProduct/', views.viewProduct, name = 'viewProduct'),
    path('adminUnniesMain/registerAdmin/', views.registerAdmin, name='registeradmin' ),
    path('adminUnniesMain/editProduct/<int:id>', views.editProduct, name='editProduct' ),
    path('adminUnniesMain/deleteProduct/<int:id>', views.deleteProduct, name='deleteProduct' ),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('', home, name = 'home' ),
    path('products/', products, name = 'products' ),
    path('viewproduct/<int:id>', view_product, name="view_product"),
    path('profile/', view_profile, name = 'view_profile'),
    path('cart/', cart, name = 'cart'),



] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
