from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from django.db.models import F
from rest_framework.permissions import IsAdminUser
from .models import Mission, Photo, Wish, RewardCounter
from .serializers import (
    MissionSerializer,
    PhotoSerializer,
    WishSerializer,
    AdminMissionSerializer,
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
# ADMIN - MISJE
# =========================

class AdminMissionListView(
    generics.ListAPIView
):
    serializer_class = AdminMissionSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Mission.objects.all().order_by(
            "order"
        )


class AdminMissionDetailView(
    generics.RetrieveUpdateAPIView
):
    serializer_class = AdminMissionSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Mission.objects.all()

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

    def perform_destroy(self, instance):
        audio = instance.audio

        instance.delete()

        if audio:
            audio.delete(save=False)
            
class AdminRewardCounterView(generics.RetrieveAPIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        counter, created = RewardCounter.objects.get_or_create(
            pk=1
        )

        return Response({
            "claimedRewards": counter.claimed_rewards,
        })

    def post(self, request, *args, **kwargs):
        counter, created = RewardCounter.objects.get_or_create(
            pk=1
        )

        RewardCounter.objects.filter(
            pk=counter.pk
        ).update(
            claimed_rewards=F("claimed_rewards") + 1
        )

        counter.refresh_from_db()

        return Response({
            "claimedRewards": counter.claimed_rewards,
        })
    def delete(self, request, *args, **kwargs):
        counter, created = RewardCounter.objects.get_or_create(
            pk=1
        )

        counter.claimed_rewards = 0
        counter.save(
            update_fields=["claimed_rewards"]
        )

        return Response({
            "claimedRewards": counter.claimed_rewards,
        })