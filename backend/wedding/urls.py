from django.urls import path

from .views import (
    MissionListView,
    PhotoListCreateView,
    WishListCreateView,
    AdminLoginView,
    AdminPhotoListView,
    AdminPhotoDetailView,
    AdminWishListView,
    AdminWishDetailView,
    AdminRewardCounterView,
    AdminMissionListView,
    AdminMissionDetailView,
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

    path(
        "wishes/",
        WishListCreateView.as_view(),
        name="wish-list-create",
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
    path(
        "admin/wishes/",
        AdminWishListView.as_view(),
        name="admin-wish-list",
    ),

    path(
        "admin/wishes/<int:pk>/",
        AdminWishDetailView.as_view(),
        name="admin-wish-detail",
    ),
    
    path(
        "admin/rewards/",
        AdminRewardCounterView.as_view(),
        name="admin-reward-counter",
    ),
    path(
        "admin/missions/",
        AdminMissionListView.as_view(),
        name="admin-mission-list",
    ),

    path(
        "admin/missions/<int:pk>/",
        AdminMissionDetailView.as_view(),
        name="admin-mission-detail",
    ),
]