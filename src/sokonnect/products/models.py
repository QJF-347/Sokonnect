from django.db import models
from pages.models import User  

# cateroy model 
class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Category Name")
    description = models.TextField(blank=True, null=True, verbose_name="Category Description")
    image = models.CharField(max_length=255, verbose_name="Category Image Path", blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

# products model
class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Product Name")
    description = models.TextField(blank=True, null=True, verbose_name="Product Description")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Quantity Available")
    image = models.CharField(max_length=255, verbose_name="Product Image Path", blank=True, null=True) 

    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', verbose_name="Owner")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products', verbose_name="Category")

    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"


class MostPopular(models.Model):
    
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='most_popular', verbose_name="Product")

    
    rank = models.PositiveIntegerField(verbose_name="Rank", unique=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return f"Most Popular: {self.product.name} (Rank: {self.rank})"

    class Meta:
        verbose_name = "Most Popular Product"
        verbose_name_plural = "Most Popular Products"
        ordering = ['rank']