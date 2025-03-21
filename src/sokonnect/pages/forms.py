from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User  

class RegistrationForm(UserCreationForm):
    ROLE_CHOICES = [
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
    ]
    role = forms.ChoiceField(choices=ROLE_CHOICES, required=True, widget=forms.HiddenInput())  #

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'role']