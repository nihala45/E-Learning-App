from django.urls import path,include
from .views import RegisterView, VerifyOTPView, LoginView



urlpatterns = [
    path('user/register/', RegisterView.as_view(), name='user-register'),
    path('user/verify_otp/<int:pk>/',VerifyOTPView.as_view(), name='verify_otp'),
    path('user/login/',LoginView.as_view(), name='user-login')
]