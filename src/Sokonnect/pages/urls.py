from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'), 
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),  
    
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacy, name='privacy'),
    path('cookie_policy/', views.cookie_policy, name='cookie_policy'),
    path('billing_policy/', views.about, name='billing_policy'),
    path('forgot_password/', views.forgot_password, name='forgot_password'),
    path('faq/', views.faq, name='faq'), 
    path('logout/', views.logout, name='logout'), 
]