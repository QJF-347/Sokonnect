from django.shortcuts import render, redirect
from django.core.files.storage import default_storage
from .forms import RegistrationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from products.models import Product, MostPopular, Category
from django.contrib.auth.decorators import login_required

# Create your views here.
def about(request):
    return render(request, 'pages/about.html')

def register(request):
    if request.method == 'POST':
        print("*"*100, "here")
        form = RegistrationForm(request.POST)  
        if form.is_valid():
            user = form.save(commit=False) 
            role = form.cleaned_data.get('role')  
            user.role = role  
            user.save()  
            return redirect('login') 
        else:
            print("Form is not valid. Errors:", form.errors)  
    else:
        form = RegistrationForm()
    return render(request, 'pages/register.html', {'form': form})


def login_view(request):
    print("Login view called")  # Debugging: Confirm the view is being called
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        print(f"Username: {username}, Password: {password}")  # Debugging: Print form data

        user = authenticate(request, username=username, password=password)

        if user is not None:
            print("User authenticated:", user.username)  # Debugging: Print authenticated user
            login(request, user)  # Log the user in
            return redirect('home')
        else:
            print("Authentication failed")  # Debugging: Print authentication failure
            messages.error(request, 'Invalid username or password. Please try again.')
            return redirect('login')
    else:
        return render(request, 'pages/login.html')


def about(request):
    return render(request, 'pages/about.html')

@login_required
def products(request):
    # Get the selected category from the query parameters
    category_name = request.GET.get('category')
    
    # Fetch all products (filter by category if specified)
    if category_name:
        products = Product.objects.filter(category__name=category_name)
    else:
        products = Product.objects.all()
    
    # Fetch all categories
    categories = Category.objects.all()
    
    context = {
        "products": products,
        "categories": categories,
        "user":request.user
    }
    return render(request, "pages/products.html", context)

def profile(request):
    # Example data (replace with your actual data)
    user = {
        "user_id": "ade3tndwki9",
        "first_name": "Denis",
        "last_name": "Mugambi",
        "phone": "0703-226-483",
        "email": "denismugambi350@gmail.com",
        "business_phone": "0123-456-789",
        "rating": 3.5,
        "review_count": 100,
        "orders_completed": 1233,
        "orders_pending": 10,
    }

    reviews = [
        {
            "image": "images/profile.jpeg",
            "reviewer_name": "Felix Denis",
            "role": "Buyer",
            "message": "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
        },
        {
            "image": "images/profile.jpeg",
            "reviewer_name": "Charles Mbutu",
            "role": "Seller",
            "message": "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
        },
        {
            "image": "images/profile.jpeg",
            "reviewer_name": "Jesse Gitahi",
            "role": "Buyer",
            "message": "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
        },
        {
            "image": "images/profile.jpeg",
            "reviewer_name": "Denis Mugambi",
            "role": "Seller",
            "message": "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
        },
    ]

    context = {
        "user": user,
        "reviews": reviews,
    }
    return render(request, "pages/profile.html", context)


def checkout(request):
    return render(request, 'pages/checkout.html')

def verification(request):
    if request.method == 'POST':
        # Process form data
        full_id_name = request.POST.get('full_id_name')
        id_no = request.POST.get('id_no')
        verify_mobile = request.POST.get('verify_mobile')
        verify_business_mobile = request.POST.get('verify_business_mobile')

        # Handle file uploads
        image = request.FILES.get('image')
        id_front = request.FILES.get('id_front')
        id_back = request.FILES.get('id_back')
        government = request.FILES.get('government')

        # Save files to the media directory
        if image:
            image_path = default_storage.save(f'verification/images/{image.name}', image)
        if id_front:
            id_front_path = default_storage.save(f'verification/id_front/{id_front.name}', id_front)
        if id_back:
            id_back_path = default_storage.save(f'verification/id_back/{id_back.name}', id_back)
        if government:
            government_path = default_storage.save(f'verification/government/{government.name}', government)

        # Save data to the database or perform other actions
        # ...

        return redirect('home')  # Redirect to home or another page

    return render(request, 'pages/verification.html')


def home(request):
    recent_arrivals_queryset = Product.objects.order_by('-created_at')[:6]  
    recent_arrivals = [
        {
            "image": arrival.image,
            "name": arrival.name,
            "price": arrival.price,
        }
        for arrival in recent_arrivals_queryset
    ]

    print(recent_arrivals)
    
    most_popular_queryset = MostPopular.objects.select_related('product').order_by('rank')[:6]  
    most_popular = [
        {
            "image": popular.product.image,
            "name": popular.product.name,
            "price": popular.product.price,
        }
        for popular in most_popular_queryset
    ]

    # Pass the data to the template
    context = {
        "recent_arrivals": recent_arrivals,
        "most_popular": most_popular,
    }
    return render(request, "pages/home.html", context)

