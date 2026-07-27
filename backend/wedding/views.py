from rest_framework import generics

from .models import Mission, Photo
from .serializers import MissionSerializer, PhotoSerializer
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

class AdminLoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        if not user.is_staff:
            return Response(
                {
                    "detail": "Brak uprawnień administratora."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            "token": token.key,
            "username": user.username,
        })


class MissionListView(generics.ListAPIView):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer


class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.all().order_by("-created_at")
    serializer_class = PhotoSerializer

class AdminPhotoListView(generics.ListAPIView):
    """
    Lista wszystkich zdjęć dostępna wyłącznie
    dla administratora.
    """

    serializer_class = PhotoSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Photo.objects.all().order_by("-created_at")


class AdminPhotoDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Photo.objects.all()

    def perform_destroy(self, instance):
        image = instance.image

        instance.delete()

        if (image):
            image.delete(save=False)