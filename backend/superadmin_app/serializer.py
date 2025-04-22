from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Topic, Course, Chapter,ChapterVideo, ChapterPDF

class TopicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Topic.objects.all())]
    )

    class Meta:
        model = Topic
        fields = '__all__'
        
        
class CourseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Course.objects.all())]
    )
    
    class Meta:
        model = Course
        fields = '__all__'
        
        
class ChapterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Chapter
        fields = '__all__'
        
        
class ChapterVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterVideo
        fields = '__all__'


class ChapterPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterPDF
        fields = '__all__'