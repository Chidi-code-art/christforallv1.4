from django.contrib import admin
from .models import Admin_dash
from unfold.admin import ModelAdmin

# Register your models here.
class YourModelAdmin(ModelAdmin): #to extend the modeladmin for customization
    pass

admin.site.register(Admin_dash, YourModelAdmin) #register your model
