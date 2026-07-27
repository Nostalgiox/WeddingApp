from django.urls import path

from .views import (
    MissionListView,
    PhotoListCreateView,
    AdminLoginView,
    AdminPhotoListView,
    AdminPhotoDetailView,
)


urlpatterns = [
    # =========================
    # PUBLICZNE API
    # =========================

    path(
        "missions/",
        MissionListView.as_view(),
        name="mission-list",
    ),

    path(
        "photos/",
        PhotoListCreateView.as_view(),
        name="photo-list-create",
    ),


    # =========================
    # ADMIN
    # =========================

    path(
        "admin/login/",
        AdminLoginView.as_view(),
        name="admin-login",
    ),

    path(
        "admin/photos/",
        AdminPhotoListView.as_view(),
        name="admin-photo-list",
    ),

    path(
        "admin/photos/<int:pk>/",
        AdminPhotoDetailView.as_view(),
        name="admin-photo-detail",
    ),
]