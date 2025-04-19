from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Topic
class TopicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Topic.objects.all())]
    )

    class Meta:
        model = Topic
        fields = '__all__'