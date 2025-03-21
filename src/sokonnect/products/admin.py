from django.contrib import admin
from.models import Product, MostPopular, Category

# Register your models here.
admin.site.register(Product)
admin.site.register(MostPopular)
admin.site.register(Category)