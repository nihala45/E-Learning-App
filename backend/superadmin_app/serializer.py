from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Topic, Course
class TopicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Topic.objects.all())]
    )

    class Meta:
        model = Topic
        fields = '__all__'
        
        
class CourseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Topic.objects.all())]
    )
    
    class Meta:
        model = Course
        fields = '__all__'