# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('add-product/', views.add_product, name='add_product'),
]