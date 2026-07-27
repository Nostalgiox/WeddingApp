from rest_framework import serializers

from .models import Mission, Photo


class MissionSerializer(serializers.ModelSerializer):
    currentPhotos = serializers.IntegerField(
        source="current_photos",
        read_only=True,
    )

    requiredPhotos = serializers.IntegerField(
        source="required_photos",
        read_only=True,
    )

    class Meta:
        model = Mission
        fields = [
            "id",
            "title",
            "icon",
            "requiredPhotos",
            "currentPhotos",
            "order",
        ]


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = [
            "id",
            "image",
            "mission",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
        ]