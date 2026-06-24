
from rest_framework import serializers
from .models import Product, Order, OrderItem, Wishlist, Review


class ProductSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(
        use_url=True
    )

    class Meta:
        model = Product
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = "__all__"


from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Review

        fields = [
            "id",
            "user",
            "username",
            "product",
            "rating",
            "comment",
            "created_at",
        ]