from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
ProductViewSet,
OrderViewSet,
OrderItemViewSet,
WishlistViewSet,
register_user,
profile,
ReviewViewSet,
dashboard_stats,
)

router = DefaultRouter()

router.register("products", ProductViewSet)
router.register("orders", OrderViewSet)
router.register("order-items", OrderItemViewSet)
router.register("wishlist", WishlistViewSet,
    basename="wishlist"
)
router.register("reviews", ReviewViewSet)

urlpatterns = [

    path("register/", register_user, name="register",),
    path("profile/<int:user_id>/", profile, name="profile",),
    path("", include(router.urls),),
    path("dashboard-stats/", dashboard_stats),    

]