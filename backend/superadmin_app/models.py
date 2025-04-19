from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)  

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=255, unique=True) 
    description = models.TextField(blank=True, null=True)  
    topics = models.ManyToManyField(Topic, related_name="courses")  
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    duration = models.CharField(max_length=100, blank=True, null=True)  

    def __str__(self):
        return self.name
