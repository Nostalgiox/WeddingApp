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


class AdminMissionSerializer(serializers.ModelSerializer):
    currentPhotos = serializers.IntegerField(
        source="current_photos",
        read_only=True,
    )

    requiredPhotos = serializers.IntegerField(
        source="required_photos",
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

        read_only_fields = [
            "id",
            "currentPhotos",
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


def convert_audio_to_m4a(audio_file):
    """
    Konwertuje przesłaną głosówkę do M4A/AAC.

    Plik wejściowy może być np. WebM/Opus.
    FFmpeg konwertuje go do AAC w kontenerze M4A,
    który jest dobrze obsługiwany przez iOS/Safari.
    """

    input_path = None
    output_path = None

    try:
        # =========================
        # PLIK WEJŚCIOWY
        # =========================

        suffix = (
            os.path.splitext(audio_file.name)[1]
            or ".webm"
        )

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
            suffix=".m4a",
            delete=False,
        )

        output_path = output_file.name
        output_file.close()

        # =========================
        # FFMPEG
        # =========================

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                input_path,

                # Tylko pierwsza ścieżka audio
                "-map",
                "0:a:0",

                # AAC
                "-c:a",
                "aac",

                # Jakość głosu
                "-b:a",
                "128k",

                # Wyłączamy niepotrzebne metadane
                "-map_metadata",
                "-1",

                # Fast Start
                "-movflags",
                "+faststart",

                # Kontener M4A
                "-f",
                "mp4",

                output_path,
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )

        # =========================
        # ODCZYT GOTOWEGO PLIKU
        # =========================

        with open(
            output_path,
            "rb",
        ) as converted_file:

            converted_data = converted_file.read()

        # =========================
        # NOWA NAZWA
        # =========================

        original_name = os.path.basename(
            audio_file.name
        )

        original_name_without_extension = os.path.splitext(
            original_name
        )[0]

        new_name = (
            f"{original_name_without_extension}.m4a"
        )

        return ContentFile(
            converted_data,
            name=new_name,
        )

    finally:
        # =========================
        # CZYSZCZENIE
        # =========================

        if (
            input_path
            and os.path.exists(input_path)
        ):
            os.remove(input_path)

        if (
            output_path
            and os.path.exists(output_path)
        ):
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
        Konwertuje głosówkę do M4A/AAC
        przed zapisaniem jej na dysku.
        """

        audio = validated_data.get("audio")

        if audio:
            validated_data["audio"] = (
                convert_audio_to_m4a(audio)
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