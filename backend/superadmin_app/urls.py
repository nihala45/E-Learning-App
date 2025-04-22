from django.urls import path,include
from .views import LoginView, CreateTopicView, TopicViewSet, CourseViewSet, ChapterViewSet, UploadVideoView, UploadPDFView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/topiclist', TopicViewSet, basename='topic')
router.register(r'admin/courselist', CourseViewSet, basename='course') 
router.register(r'admin/chapterlist', ChapterViewSet, basename='chapter') 




urlpatterns = [
    path('superadmin/login/',LoginView.as_view(), name='login_view'),
    path('superadmin/createtopic/',CreateTopicView.as_view(), name='create_topic'),
    path('superadmin/uploadvideo/',UploadVideoView.as_view(), name='upload_video'),
    path('superadmin/uploadpdf/',UploadPDFView.as_view(), name='upload_pdf'),
    path('', include(router.urls)),
]

