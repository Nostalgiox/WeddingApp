import os
import subprocess
import tempfile

from django.core.files.base import ContentFile
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


def fix_audio_duration(audio_file):
    """
    Przepisuje plik WebM przez FFmpeg bez ponownego
    kodowania dźwięku. Dzięki temu FFmpeg może zapisać
    prawidłowe metadane długości pliku.
    """

    suffix = os.path.splitext(audio_file.name)[1] or ".webm"

    input_path = None
    output_path = None

    try:
        # =========================
        # PLIK WEJŚCIOWY
        # =========================

        with tempfile.NamedTemporaryFile(
            suffix=suffix,
            delete=False,
        ) as input_file:

            for chunk in audio_file.chunks():
                input_file.write(chunk)

            input_path = input_file.name

        # =========================
        # PLIK WYJŚCIOWY
        # =========================

        output_file = tempfile.NamedTemporaryFile(
            suffix=".webm",
            delete=False,
        )

        output_path = output_file.name
        output_file.close()

        # =========================
        # FFmpeg
        # =========================

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                input_path,
                "-map",
                "0:a:0",
                "-c:a",
                "copy",
                "-fflags",
                "+genpts",
                "-f",
                "webm",
                output_path,
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )

        # =========================
        # ODCZYT GOTOWEGO PLIKU
        # =========================

        with open(output_path, "rb") as fixed_file:
            fixed_data = fixed_file.read()

        return ContentFile(
            fixed_data,
            name=audio_file.name,
        )

    finally:
        # =========================
        # CZYSZCZENIE
        # =========================

        if input_path and os.path.exists(input_path):
            os.remove(input_path)

        if output_path and os.path.exists(output_path):
            os.remove(output_path)


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

    def create(self, validated_data):
        """
        Przetwarza głosówkę przed zapisaniem jej
        do media/wishes/audio/...
        """

        audio = validated_data.get("audio")

        if audio:
            validated_data["audio"] = fix_audio_duration(
                audio
            )

        return super().create(validated_data)


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