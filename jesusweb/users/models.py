from django.db import models
from django.contrib.auth.models import User
from django_ckeditor_5.fields import CKEditor5Field

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userage = models.IntegerField(null=True, blank=True)  # Makes field optional
    country = models.CharField(max_length=100, blank=True)  # Makes field optional


#for the creation of posts
class Admin_dash(models.Model):
    POST_TYPES = [
        ('image', 'Image Post'),
        ('video', 'Video Post'),
    ]
    
    post_type = models.CharField(max_length=5, choices=POST_TYPES, default='image')
    image_head = models.ImageField(upload_to='postings/', null=True, blank=True)
    video_head = models.FileField(upload_to='videos/', null=True, blank=True)
    slug = models.SlugField(max_length=250, unique_for_date='post_date', default='default-slug')
    image_credit = models.CharField(max_length=255, blank=True, null=True)  # ← Add this
    post_title = models.CharField(max_length=255)
    post_content = CKEditor5Field(default="Default body")
    post_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.post_title

    def get_media(self):
        if self.post_type == 'image' and self.image_head:
            return self.image_head.url
        elif self.post_type == 'video' and self.video_head:
            return self.video_head.url
        return None