from django.urls import path,include
from .views import LoginView, CreateTopicView, TopicViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/topiclist',TopicViewSet, basename='topic')



urlpatterns = [
    path('superadmin/login/',LoginView.as_view(), name='login_view'),
    path('superadmin/createtopic/',CreateTopicView.as_view(), name='create_topic'),
    path('', include(router.urls)),
]