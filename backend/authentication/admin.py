from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    list_display = ('email', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff')
    search_fields = ('email',)
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'username','password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

# Register the AppUser model with the custom admin class
admin.site.register(AppUser, AppUserAdmin)
