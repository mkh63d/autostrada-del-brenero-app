"""
Serializers for the attractions API.
"""

from rest_framework import serializers
from .models import Attraction, Submission


class AttractionSerializer(serializers.ModelSerializer):
    """
    Serializer for public attraction data.
    """
    
    class Meta:
        model = Attraction
        fields = [
            'id',
            'name',
            'description',
            'type',
            'address',
            'phone',
            'website',
            'opening_hours',
            'price',
            'latitude',
            'longitude',
            'autostrade_exit',
            'distance_from_exit',
            'featured',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AttractionListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for attraction list views.
    """
    
    class Meta:
        model = Attraction
        fields = [
            'id',
            'name',
            'description',
            'type',
            'address',
            'latitude',
            'longitude',
            'autostrade_exit',
            'distance_from_exit',
            'featured',
        ]


class SubmissionCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new submissions (public endpoint).
    """
    
    class Meta:
        model = Submission
        fields = [
            'id',
            'name',
            'description',
            'type',
            'address',
            'phone',
            'website',
            'opening_hours',
            'price',
            'latitude',
            'longitude',
            'autostrade_exit',
            'distance_from_exit',
            'submitter_email',
            'submitter_name',
            'submitted_at',
        ]
        read_only_fields = ['id', 'submitted_at']


class SubmissionSerializer(serializers.ModelSerializer):
    """
    Full serializer for submissions (admin view).
    """
    
    approved_attraction = AttractionSerializer(read_only=True)
    
    class Meta:
        model = Submission
        fields = [
            'id',
            'name',
            'description',
            'type',
            'address',
            'phone',
            'website',
            'opening_hours',
            'price',
            'latitude',
            'longitude',
            'autostrade_exit',
            'distance_from_exit',
            'status',
            'reviewer_notes',
            'rejection_reason',
            'approved_attraction',
            'submitter_email',
            'submitter_name',
            'submitted_at',
            'reviewed_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'submitted_at', 'reviewed_at', 'updated_at', 'approved_attraction']


class SubmissionReviewSerializer(serializers.Serializer):
    """
    Serializer for reviewing submissions (approve/reject actions).
    """
    
    action = serializers.ChoiceField(choices=['approve', 'reject', 'needs_changes'])
    reviewer_notes = serializers.CharField(required=False, allow_blank=True)
    rejection_reason = serializers.CharField(required=False, allow_blank=True)
    
    def validate(self, data):
        if data['action'] == 'reject' and not data.get('rejection_reason'):
            raise serializers.ValidationError({
                'rejection_reason': 'Rejection reason is required when rejecting a submission.'
            })
        return data


class SubmissionStatusSerializer(serializers.ModelSerializer):
    """
    Serializer for checking submission status (public, limited info).
    """
    
    class Meta:
        model = Submission
        fields = [
            'id',
            'name',
            'status',
            'rejection_reason',
            'submitted_at',
            'reviewed_at',
        ]
