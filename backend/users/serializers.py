from djoser.serializers import UserSerializer
from rest_framework import serializers
from api.serializers.company import CompanySerializer
from .models import User
from django.contrib.auth.hashers import make_password

class CustomUserSerializer(UserSerializer):
    company = serializers.SerializerMethodField()
    class Meta(UserSerializer.Meta):
        model = User
        fields = ['name', 'email', 'phone', 'company', 'role', 'is_active', 'id']

    def get_company(self, obj):
        return CompanySerializer(obj.company).data if obj.company else None


class CustomUserCreateSerializer(UserSerializer):
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    class Meta(UserSerializer.Meta):
        model = User
        fields = ['name', 'email', 'phone', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            password=validated_data['password'],
        )
        user.save()
        return user
