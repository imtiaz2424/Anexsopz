from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework import status, viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from .models import (
    Product,
    Order,
    OrderItem,
    Wishlist,
    Review,
)

from .serializers import (
    ProductSerializer,
    OrderSerializer,
    OrderItemSerializer,
    WishlistSerializer,
    ReviewSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    permission_classes = [
        AllowAny
    ]



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        order = Order.objects.create(
            user_id=request.data.get("user"),
            total_price=request.data.get("total_price"),
            title=request.data.get("title", "Order")
        )

        serializer = self.get_serializer(order)

        return Response(
            serializer.data,
            status=201
        )

    def get_queryset(self):
        user_id = self.request.query_params.get("user")

        if user_id:
            return Order.objects.filter(
                user_id=user_id
            )

        return Order.objects.all()


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()

    serializer_class = (
        OrderItemSerializer
    )

    permission_classes = [
        AllowAny
    ]

    def get_queryset(self):
        order_id = (
            self.request.query_params.get(
                "order"
            )
        )

        if order_id:
            return OrderItem.objects.filter(
                order_id=order_id
            )

        return OrderItem.objects.all()

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = (
        WishlistSerializer
    )

    permission_classes = [
        AllowAny
    ]

    def get_queryset(self):
        user_id = (
            self.request.query_params.get(
                "user"
            )
        )

        if user_id:
            return Wishlist.objects.filter(
                user_id=user_id
            )

        return Wishlist.objects.all()




class ReviewViewSet(
    viewsets.ModelViewSet
):
    queryset = Review.objects.all()

    serializer_class = (
        ReviewSerializer
    )

    permission_classes = [
        AllowAny
    ]

    def get_queryset(self):
        product_id = (
            self.request.query_params.get(
                "product"
            )
        )

        if product_id:
            return Review.objects.filter(
                product_id=product_id
            )

        return Review.objects.all()




@api_view(["POST"])
def register_user(request):
    username = request.data.get(
        "username"
    )

    email = request.data.get(
        "email"
    )

    password = request.data.get(
        "password"
    )

    if (
        not username
        or not email
        or not password
    ):
        return Response(
            {
                "error":
                "All fields are required"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(
        username=username
    ).exists():
        return Response(
            {
                "error":
                "Username already exists"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(
        email=email
    ).exists():
        return Response(
            {
                "error":
                "Email already exists"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "message":
            "User created successfully",

            "user_id":
            user.id,

            "username":
            user.username,

            "email":
            user.email,
        },
        status=status.HTTP_201_CREATED,
    )



@api_view(["GET"])
def profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

    except User.DoesNotExist:
        return Response(
            {
                "error": "User not found"
            },
            status=404
        )



@api_view(["GET"])
def dashboard_stats(request):

    total_products = Product.objects.count()

    total_users = User.objects.count()

    total_orders = Order.objects.count()

    revenue = (
        Order.objects.aggregate(
            total=Sum("total_price")
        )["total"]
        or 0
    )

    return Response({
        "total_products": total_products,
        "total_users": total_users,
        "total_orders": total_orders,
        "revenue": revenue,
    })

    