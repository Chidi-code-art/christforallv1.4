from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from .models import UserProfile
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from .models import Admin_dash


# Admin credentials
admin_name = "Jesus"
admin_password = "Jesusisking"

def signup(request):
    if request.method == 'POST':
        name = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        country = request.POST.get("country")
        age = request.POST.get("userage")

        if not all([name, password, email, country, age]):
            messages.error(request, "All fields are required")
            return redirect('signup')
            
        if User.objects.filter(username=name).exists():
            messages.error(request, "Username already exists")
            return redirect('signup')
            
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists")
            return redirect('signup')

        # Create user and profile
        user = User.objects.create_user(
            username=name,
            email=email,
            password=password
        )
        UserProfile.objects.create(
            user=user,
            userage=age,
            country=country
        )
        
        return redirect('https://www.whatsapp.com/channel/0029VajdkyhCsU9XUmITrI20')  # This will redirect to login page

    return render(request, 'signup.html')

def home(request):
    # Get image posts (posts with image_head)
    image_posts = Admin_dash.objects.exclude(image_head='').order_by('-post_date')
    
    # Get video posts (posts with video_head)
    video_posts = Admin_dash.objects.exclude(video_head='').order_by('-post_date')
    
    return render(request, 'index.html', {
        'image_posts': image_posts,
        'video_posts': video_posts
    })

def login(request):
    if request.method == "POST":
        name = request.POST.get("username")
        password = request.POST.get("password")

        if name == admin_name and password == admin_password:
            return redirect('/admin/')
        
        user = authenticate(request, username=name, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password")
            return redirect('login')
        
    return render(request, 'login.html')




    

#for the single post:
def post_single(request, post):
    post = get_object_or_404(Admin_dash, slug=post)
    return render(request, 'post.html', {'post':post})
