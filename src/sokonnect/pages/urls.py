from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile, name='profile'),
    path('products/', views.products, name='products'),
    path('verification/', views.verification, name='verification'),
    path('register/', views.register, name='register'),
    path('checkout/', views.checkout, name='checkout'),
]