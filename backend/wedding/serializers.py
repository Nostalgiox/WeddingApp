from rest_framework import serializers

from .models import Mission, Photo, Wish


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

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish

        fields = [
            "id",
            "author",
            "content",
            "audio",
            "is_anonymous",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]

    def validate(self, attrs):
        is_anonymous = attrs.get(
            "is_anonymous",
            False,
        )

        author = attrs.get(
            "author",
            "",
        ).strip()

        content = attrs.get(
            "content",
            "",
        ).strip()

        audio = attrs.get(
            "audio",
            None,
        )

        # =========================
        # TEKST LUB AUDIO
        # =========================

        if not content and not audio:
            raise serializers.ValidationError({
                "content": (
                    "Dodaj treść życzeń "
                    "lub nagraj wiadomość głosową."
                )
            })

        attrs["content"] = content

        # =========================
        # ANONIMOWO
        # =========================

        if is_anonymous:
            attrs["author"] = ""

        # =========================
        # Z PODPISEM
        # =========================

        else:
            if not author:
                raise serializers.ValidationError({
                    "author": (
                        "Podaj podpis lub wybierz "
                        "opcję anonimową."
                    )
                })

            attrs["author"] = author

        return attrs

class AdminWishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish

        fields = [
            "id",
            "author",
            "content",
            "audio",
            "is_anonymous",
            "is_visible",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "author",
            "content",
            "audio",
            "is_anonymous",
            "created_at",
        ]