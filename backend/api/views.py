from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, action
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
import pyotp
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        email = serializer.validated_data.get('email')
        phone = serializer.validated_data.get('phone')

        if User.objects.filter(email__iexact=email, is_email_verified=True).exists():
            raise serializers.ValidationError({"email": "This email is already verified and registered."})

  
        User.objects.filter(email__iexact=email, is_email_verified=False).delete()

       
        if User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError({"phone": "This phone number is already taken."})


        otp_secret = pyotp.random_base32()
        totp = pyotp.TOTP(otp_secret, interval=300) 
        otp = totp.now()
        print('this is the otp',':',otp)

    
        user = serializer.save(email_otp=otp)

      
        send_mail(
            subject='Email Verification OTP',
            message=f'Hi {user.username},\n\nYour OTP is: {otp}\nThis is valid for 5 minutes.',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )

        
        
      
        return user
    
    
    
class VerifyOTPView(APIView):
    authentication_classes = []  
    permission_classes = [AllowAny] 
    def post(self, request, pk):
        otp = request.data.get('email_otp')

        if not otp:
            return Response({'error': 'OTP is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=pk)

            if user.email_otp == otp:
                user.is_email_verified = True
                user.email_otp = None
                user.save()

                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'OTP verified successfully!',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser,
                }, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request,*args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email = email, password = password)
        print(email, password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access' : str(refresh.access_token),
                'is_superuser': user.is_superuser,
            })
        return Response({'error': 'invalid creditials'}, status=400)

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        