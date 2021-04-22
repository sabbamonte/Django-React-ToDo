from django.db import models

# Create your models here.

class Tasks(models.Model):
    objects = models.Manager()
    task = models.CharField(max_length=120)
    body = models.CharField(max_length=200, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
