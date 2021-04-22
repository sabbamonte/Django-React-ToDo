from django.contrib import admin
from .models import Tasks

class TasksAdmin(admin.ModelAdmin):
    list_display = ('task', 'body', 'timestamp', 'completed')

# Register your models here.

admin.site.register(Tasks, TasksAdmin)