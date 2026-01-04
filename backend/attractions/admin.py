"""
Admin configuration for attractions app.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone
from .models import Attraction, Submission


@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = [
        'name', 
        'type', 
        'autostrade_exit', 
        'status', 
        'featured',
        'created_at',
    ]
    list_filter = ['type', 'status', 'featured', 'autostrade_exit']
    search_fields = ['name', 'description', 'address', 'autostrade_exit']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['status', 'featured']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'type', 'status', 'featured')
        }),
        ('Contact & Location', {
            'fields': ('address', 'phone', 'website', 'latitude', 'longitude')
        }),
        ('Highway Information', {
            'fields': ('autostrade_exit', 'distance_from_exit')
        }),
        ('Additional Details', {
            'fields': ('opening_hours', 'price')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'type',
        'status_badge',
        'submitter_email',
        'submitted_at',
        'reviewed_at',
        'review_actions',
    ]
    list_filter = ['status', 'type', 'submitted_at']
    search_fields = ['name', 'description', 'address', 'submitter_email', 'submitter_name']
    readonly_fields = ['submitted_at', 'reviewed_at', 'updated_at', 'approved_attraction_link']
    date_hierarchy = 'submitted_at'
    
    fieldsets = (
        ('Submission Data', {
            'fields': ('name', 'description', 'type', 'address', 'phone', 'website')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude', 'autostrade_exit', 'distance_from_exit')
        }),
        ('Additional Details', {
            'fields': ('opening_hours', 'price')
        }),
        ('Submitter Information', {
            'fields': ('submitter_name', 'submitter_email')
        }),
        ('Review', {
            'fields': ('status', 'reviewer_notes', 'rejection_reason', 'approved_attraction_link')
        }),
        ('Timestamps', {
            'fields': ('submitted_at', 'reviewed_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['approve_submissions', 'reject_submissions']
    
    def status_badge(self, obj):
        colors = {
            'pending': '#f59e0b',
            'approved': '#10b981',
            'rejected': '#ef4444',
            'needs_changes': '#6366f1',
        }
        color = colors.get(obj.status, '#6b7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    status_badge.admin_order_field = 'status'
    
    def approved_attraction_link(self, obj):
        if obj.approved_attraction:
            url = reverse('admin:attractions_attraction_change', args=[obj.approved_attraction.id])
            return format_html('<a href="{}">{}</a>', url, obj.approved_attraction.name)
        return '-'
    approved_attraction_link.short_description = 'Approved Attraction'
    
    def review_actions(self, obj):
        if obj.status == 'pending':
            return format_html(
                '<span style="color: #f59e0b; font-weight: bold;">⏳ Awaiting Review</span>'
            )
        elif obj.status == 'approved':
            return format_html(
                '<span style="color: #10b981;">✓ Approved</span>'
            )
        elif obj.status == 'rejected':
            return format_html(
                '<span style="color: #ef4444;">✗ Rejected</span>'
            )
        else:
            return format_html(
                '<span style="color: #6366f1;">↻ Needs Changes</span>'
            )
    review_actions.short_description = 'Review Status'
    
    @admin.action(description='Approve selected submissions')
    def approve_submissions(self, request, queryset):
        approved_count = 0
        for submission in queryset.filter(status='pending'):
            submission.approve(reviewer_notes=f'Bulk approved by {request.user.username}')
            approved_count += 1
        self.message_user(request, f'{approved_count} submission(s) approved.')
    
    @admin.action(description='Reject selected submissions')
    def reject_submissions(self, request, queryset):
        rejected_count = 0
        for submission in queryset.filter(status='pending'):
            submission.reject(
                reason='Rejected during bulk review',
                reviewer_notes=f'Bulk rejected by {request.user.username}'
            )
            rejected_count += 1
        self.message_user(request, f'{rejected_count} submission(s) rejected.')
