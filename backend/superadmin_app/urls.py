from django.urls import path,include
from .views import LoginView, CreateTopicView



urlpatterns = [
    path('superadmin/login/',LoginView.as_view(), name='login_view'),
    path('superadmin/createtopic/',CreateTopicView.as_view(), name='create_topic'),
    
]