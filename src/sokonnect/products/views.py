from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Category
from .forms import ProductForm

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save(commit=False)
            product.owner = request.user  # Set the owner to the logged-in user
            product.save()
            return JsonResponse({'status': 'success', 'message': 'Product added successfully!'})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)