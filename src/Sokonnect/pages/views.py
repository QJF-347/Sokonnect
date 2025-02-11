from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib import messages
from django.contrib.auth.models import User


# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

def login(request):

    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]

        # Check if a user with the email exists
        try:
            username = User.objects.get(email=email).username
        except User.DoesNotExist:
            messages.error(request, "Invalid email or password.")
            return redirect("login")

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)  # Use Django's login function safely
            return redirect("home")  # Change this to your target page
        else:
            messages.error(request, "Invalid email or password.")
            return redirect("login")

    return render(request, "pages/login.html")


def signup(request):
    
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirm_password = request.POST["confirm_password"]

        # Check if passwords match
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("register")

        # Check if user already exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("register")

        # Create the user
        user = User.objects.create_user(username=email, email=email, password=password)
        user.first_name = name
        user.save()

        messages.success(request, "Account created successfully. Please log in.")
        return redirect("login")

    return render(request, 'pages/signup.html')

def forgot_password(request):
    return 

def about(request):
    return

def terms(request):
    return

def privacy(request):
    return

def cookie_policy(request):
    return

def billing_policy(request):
    return

def services(request):
    return

def faq(request):
    return

def logout(request):
    logout(request)
    return redirect('login')