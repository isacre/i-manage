from api.models.company import Company
from rest_framework import serializers

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'phone', 'identifier', 'opens_at', 'closes_at', 'image', 'work_days', 'timezone', 'address', 'banner', 'primary_color', 'keywords']




class CompanyRegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    timezone = serializers.CharField()
    identifier = serializers.CharField()
    address = serializers.CharField()
    keywords = serializers.ListField(child=serializers.CharField())
