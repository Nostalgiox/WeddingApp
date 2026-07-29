from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .models import Mission, Photo, Wish
from .serializers import (
    MissionSerializer,
    PhotoSerializer,
    WishSerializer,
)

from .serializers import (
    MissionSerializer,
    PhotoSerializer,
    WishSerializer,
    AdminWishSerializer,
)


# =========================
# LOGOWANIE ADMINA
# =========================

class AdminLoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data["user"]

        if not user.is_staff:
            return Response(
                {
                    "detail": (
                        "Brak uprawnień "
                        "administratora."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        token, created = (
            Token.objects.get_or_create(
                user=user
            )
        )

        return Response({
            "token": token.key,
            "username": user.username,
        })


# =========================
# MISJE
# =========================

class MissionListView(
    generics.ListAPIView
):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer


# =========================
# ZDJĘCIA
# =========================

class PhotoListCreateView(
    generics.ListCreateAPIView
):
    queryset = Photo.objects.all().order_by(
        "-created_at"
    )

    serializer_class = PhotoSerializer


# =========================
# ŻYCZENIA
# =========================

class WishListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = WishSerializer

    def get_queryset(self):
        return Wish.objects.filter(
            is_visible=True
        ).order_by("-created_at")


# =========================
# ADMIN - ZDJĘCIA
# =========================

class AdminPhotoListView(
    generics.ListAPIView
):
    """
    Lista wszystkich zdjęć dostępna
    wyłącznie dla administratora.
    """

    serializer_class = PhotoSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Photo.objects.all().order_by(
            "-created_at"
        )


class AdminPhotoDetailView(
    generics.RetrieveDestroyAPIView
):
    serializer_class = PhotoSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Photo.objects.all()

    def perform_destroy(self, instance):
        image = instance.image

        instance.delete()

        if image:
            image.delete(save=False)

# =========================
# ADMIN - ŻYCZENIA
# =========================

class AdminWishListView(
    generics.ListAPIView
):
    serializer_class = AdminWishSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Wish.objects.all().order_by(
            "-created_at"
        )


class AdminWishDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = AdminWishSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Wish.objects.all()