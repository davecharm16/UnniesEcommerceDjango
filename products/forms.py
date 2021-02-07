from django import forms
from .models import Product, ImageModelProduct

class ProductForm(forms.ModelForm):

    class Meta:

        model = Product
        fields = (  'title',
                    'description',
                    'product_type',
                    'price',
                    'stocks',
                    'is_active',
                    )

class ImageForm(forms.ModelForm):
    class Meta:
        model = ImageModelProduct
        fields = ("image",)
