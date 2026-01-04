"""
Views and ViewSets for the attractions API.
"""

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from .models import Attraction, Submission
from .serializers import (
    AttractionSerializer,
    AttractionListSerializer,
    SubmissionSerializer,
    SubmissionCreateSerializer,
    SubmissionReviewSerializer,
    SubmissionStatusSerializer,
)


@api_view(['GET'])
def api_health(request):
    """Health check endpoint."""
    return Response({
        'status': 'healthy',
        'timestamp': timezone.now().isoformat(),
        'version': '1.0.0',
    })


class AttractionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing attractions.
    
    - List/Retrieve: Public access
    - Create/Update/Delete: Admin only
    """
    
    queryset = Attraction.objects.filter(status='active')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'autostrade_exit', 'featured']
    search_fields = ['name', 'description', 'address', 'autostrade_exit']
    ordering_fields = ['name', 'created_at', 'distance_from_exit']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AttractionListSerializer
        return AttractionSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured', 'by_exit']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured attractions."""
        featured = self.queryset.filter(featured=True)
        serializer = AttractionListSerializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='by-exit/(?P<exit_name>[^/.]+)')
    def by_exit(self, request, exit_name=None):
        """Get attractions near a specific highway exit."""
        attractions = self.queryset.filter(autostrade_exit__icontains=exit_name)
        serializer = AttractionListSerializer(attractions, many=True)
        return Response(serializer.data)


class SubmissionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing attraction submissions.
    
    - Create/Check Status: Public access
    - List/Review: Admin only
    """
    
    queryset = Submission.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'type']
    search_fields = ['name', 'description', 'address', 'submitter_email']
    ordering_fields = ['submitted_at', 'reviewed_at', 'status']
    ordering = ['-submitted_at']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SubmissionCreateSerializer
        if self.action == 'check_status':
            return SubmissionStatusSerializer
        if self.action == 'review':
            return SubmissionReviewSerializer
        return SubmissionSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'check_status']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    def create(self, request, *args, **kwargs):
        """Public endpoint to submit a new attraction."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()
        
        return Response({
            'message': 'Submission received successfully',
            'submission_id': submission.id,
            'status': submission.status,
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'], url_path='status')
    def check_status(self, request, pk=None):
        """Public endpoint to check submission status."""
        submission = self.get_object()
        serializer = SubmissionStatusSerializer(submission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def review(self, request, pk=None):
        """Admin endpoint to review (approve/reject) a submission."""
        submission = self.get_object()
        
        if submission.status != 'pending':
            return Response({
                'error': f'Submission has already been reviewed. Current status: {submission.status}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = SubmissionReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        action_type = serializer.validated_data['action']
        reviewer_notes = serializer.validated_data.get('reviewer_notes')
        
        if action_type == 'approve':
            attraction = submission.approve(reviewer_notes=reviewer_notes)
            return Response({
                'message': 'Submission approved successfully',
                'attraction': AttractionSerializer(attraction).data,
            })
        
        elif action_type == 'reject':
            rejection_reason = serializer.validated_data['rejection_reason']
            submission.reject(reason=rejection_reason, reviewer_notes=reviewer_notes)
            return Response({
                'message': 'Submission rejected',
                'submission': SubmissionStatusSerializer(submission).data,
            })
        
        elif action_type == 'needs_changes':
            submission.status = 'needs_changes'
            submission.reviewer_notes = reviewer_notes
            submission.reviewed_at = timezone.now()
            submission.save()
            return Response({
                'message': 'Submission marked as needing changes',
                'submission': SubmissionStatusSerializer(submission).data,
            })
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Admin endpoint to get all pending submissions."""
        pending = self.queryset.filter(status='pending')
        page = self.paginate_queryset(pending)
        if page is not None:
            serializer = SubmissionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SubmissionSerializer(pending, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Admin endpoint to get submission statistics."""
        total = self.queryset.count()
        pending = self.queryset.filter(status='pending').count()
        approved = self.queryset.filter(status='approved').count()
        rejected = self.queryset.filter(status='rejected').count()
        needs_changes = self.queryset.filter(status='needs_changes').count()
        
        return Response({
            'total': total,
            'pending': pending,
            'approved': approved,
            'rejected': rejected,
            'needs_changes': needs_changes,
        })
