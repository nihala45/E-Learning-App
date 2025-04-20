from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)  
    
    def __str__(self):
        return self.name
    
    
class Chapter(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.topic.name} - {self.title}"
    

class ChapterVideo(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='videos')
    video = models.FileField(upload_to='videos/')
    
    def __str__(self):
        return f"Video for {self.chapter.title}"
    

class ChapterPDF(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='pdfs')  # ✅ fixed variable name
    pdf = models.FileField(upload_to='pdfs/')
    
    def __str__(self):
        return f"PDF for {self.chapter.title}"  


class Course(models.Model):
    name = models.CharField(max_length=255, unique=True) 
    description = models.TextField(blank=True, null=True)  
    topics = models.ManyToManyField(Topic, related_name="courses")  
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    duration = models.CharField(max_length=100, blank=True, null=True)  

    def __str__(self):
        return self.name
