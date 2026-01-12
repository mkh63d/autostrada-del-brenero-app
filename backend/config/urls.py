"""
URL configuration for Autostrada del Brennero API.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from attractions.views import AttractionViewSet, SubmissionViewSet, api_health

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet, basename='attraction')
router.register(r'submissions', SubmissionViewSet, basename='submission')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/health/', api_health, name='api-health'),
]
