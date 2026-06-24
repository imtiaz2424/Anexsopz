from rest_framework import serializers
from .models import Product, Order, OrderItem, Wishlist, Review, Profile


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

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    class Meta:
        model = Wishlist

        fields = [
            "id",
            "user",
            "product",
            "product_name",
            "product_price",
            "product_image",
            "created_at",
        ]


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




class ProfileSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Profile

        fields = [
            "id",
            "user",
            "username",
            "image",
        ]