from rest_framework import serializers

class TemporaryImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
    folder = serializers.ChoiceField(choices=['company_images', 'company_banners'], default='company_images')