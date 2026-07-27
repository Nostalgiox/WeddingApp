from django.contrib import admin

from .models import Mission, Photo
# Register your models here.

@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "required_photos",
        "current_photos",
        "order",
    )

    ordering = ("order",)

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "mission",
        "created_at",
    )

    list_filter = ("mission", "created_at")
