from api.models.company import Company
from rest_framework import serializers

class CompanySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'phone', 'identifier', 'opens_at', 'closes_at', 'image_url', 'work_days', 'timezone', 'address', 'banner', 'primary_color', 'keywords']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return  request.build_absolute_uri(obj.image.url)  if request else obj.image.url 
        return None



class CompanyRegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    timezone = serializers.CharField()
    identifier = serializers.CharField()
    image = serializers.ImageField(required=False, allow_null=True)
    address = serializers.CharField()
    keywords = serializers.ListField(child=serializers.CharField())
