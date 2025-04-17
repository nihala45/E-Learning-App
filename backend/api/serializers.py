from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User


# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         validators = [UniqueValidator(queryset=User.objects.all())]
#     )
#     username = serializers.CharField(
#         validators = [UniqueValidator(queryset=User.objects.all())]
#     )
#     phone = serializers.CharField(
#         validators = [UniqueValidator(queryset=User.objects.all())]
#     )
#     password = serializers.CharField(write_only = True)
    
#     class Meta:
#         model = User
#         fields = '__all__' 
#         extra_kwargs = {
#             'is_active': {'required': False},
#             'is_superuser': {'required': False},
#             'is_staff': {'required': False},
#             'role': {'required': False},
#         }
    
#     def create(self, validated_data):
#         print('this is your serializJHeNr')
#         password = validated_data.pop('password')
#         user = User(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'phone',
            'password', 'role', 'is_active',
            'is_email_verified', 'email_otp',
        )
        extra_kwargs = {
            'is_active': {'read_only': True},
            'is_email_verified': {'read_only': True},
            'email_otp': {'read_only': True},
            'role': {'required': False},
            'email': {'validators': []},     
            'username': {'validators': []}, 
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
