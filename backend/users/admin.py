from django.contrib import admin

from .models import *

# class User(admin.ModelAdmin):
#     model = User


# @admin.register(User)
# class CursoAdmin(admin.ModelAdmin):
#  list_display = ('id')
    
    

admin.site.register(User)#importa al admin

# Register your models here.
