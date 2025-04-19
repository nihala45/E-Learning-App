from django.urls import path,include
from .views import RegisterView, VerifyOTPView, LoginView, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user/userslist', UserViewSet, basename='user')



urlpatterns = [
    path('user/register/', RegisterView.as_view(), name='user-register'),
    path('user/verify_otp/<int:pk>/',VerifyOTPView.as_view(), name='verify_otp'),
    path('user/login/',LoginView.as_view(), name='user-login'),
    path('', include(router.urls)),
]