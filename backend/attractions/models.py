"""
Models for the attractions app.
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Attraction(models.Model):
    """
    Approved attraction that is publicly visible.
    """
    
    TYPE_CHOICES = [
        ('museum', 'Museum'),
        ('experience', 'Experience'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    address = models.CharField(max_length=500)
    phone = models.CharField(max_length=50, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True)
    opening_hours = models.CharField(max_length=500, blank=True, null=True)
    price = models.CharField(max_length=255, blank=True, null=True)
    
    # Location fields
    latitude = models.DecimalField(
        max_digits=10, 
        decimal_places=7,
        validators=[MinValueValidator(-90), MaxValueValidator(90)],
        blank=True, 
        null=True
    )
    longitude = models.DecimalField(
        max_digits=10, 
        decimal_places=7,
        validators=[MinValueValidator(-180), MaxValueValidator(180)],
        blank=True, 
        null=True
    )
    
    # Highway info
    autostrade_exit = models.CharField(max_length=255, blank=True, null=True)
    distance_from_exit = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        blank=True, 
        null=True,
        help_text="Distance from highway exit in kilometers"
    )
    
    # Metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['type']),
            models.Index(fields=['status']),
            models.Index(fields=['autostrade_exit']),
        ]
    
    def __str__(self):
        return self.name


class Submission(models.Model):
    """
    User-submitted attraction pending review.
    """
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('needs_changes', 'Needs Changes'),
    ]
    
    TYPE_CHOICES = [
        ('museum', 'Museum'),
        ('experience', 'Experience'),
    ]
    
    # Submission data (mirrors Attraction fields)
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    address = models.CharField(max_length=500)
    phone = models.CharField(max_length=50, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True)
    opening_hours = models.CharField(max_length=500, blank=True, null=True)
    price = models.CharField(max_length=255, blank=True, null=True)
    
    # Location fields
    latitude = models.DecimalField(
        max_digits=10, 
        decimal_places=7,
        validators=[MinValueValidator(-90), MaxValueValidator(90)],
        blank=True, 
        null=True
    )
    longitude = models.DecimalField(
        max_digits=10, 
        decimal_places=7,
        validators=[MinValueValidator(-180), MaxValueValidator(180)],
        blank=True, 
        null=True
    )
    
    # Highway info
    autostrade_exit = models.CharField(max_length=255, blank=True, null=True)
    distance_from_exit = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        blank=True, 
        null=True,
        help_text="Distance from highway exit in kilometers"
    )
    
    # Review fields
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewer_notes = models.TextField(blank=True, null=True, help_text="Internal notes from reviewer")
    rejection_reason = models.TextField(blank=True, null=True, help_text="Reason shown to submitter if rejected")
    
    # Link to approved attraction (if approved)
    approved_attraction = models.ForeignKey(
        Attraction, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='submissions'
    )
    
    # Submitter info
    submitter_email = models.EmailField(blank=True, null=True, help_text="Optional email for notifications")
    submitter_name = models.CharField(max_length=255, blank=True, null=True)
    
    # Metadata
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-submitted_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['submitted_at']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"
    
    def approve(self, reviewer_notes=None):
        """
        Approve submission and create an Attraction.
        """
        from django.utils import timezone
        
        attraction = Attraction.objects.create(
            name=self.name,
            description=self.description,
            type=self.type,
            address=self.address,
            phone=self.phone,
            website=self.website,
            opening_hours=self.opening_hours,
            price=self.price,
            latitude=self.latitude,
            longitude=self.longitude,
            autostrade_exit=self.autostrade_exit,
            distance_from_exit=self.distance_from_exit,
        )
        
        self.status = 'approved'
        self.approved_attraction = attraction
        self.reviewed_at = timezone.now()
        if reviewer_notes:
            self.reviewer_notes = reviewer_notes
        self.save()
        
        return attraction
    
    def reject(self, reason, reviewer_notes=None):
        """
        Reject submission with a reason.
        """
        from django.utils import timezone
        
        self.status = 'rejected'
        self.rejection_reason = reason
        self.reviewed_at = timezone.now()
        if reviewer_notes:
            self.reviewer_notes = reviewer_notes
        self.save()
