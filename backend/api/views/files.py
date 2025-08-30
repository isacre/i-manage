import os
import hashlib
from django.conf import settings
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from api.serializers.image_file import TemporaryImageUploadSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class TemporaryImageUploadView(ViewSet):
    available_folders = ['company_images', 'company_banners']

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name='folder',
                in_='query',
                type=openapi.TYPE_STRING,
                required=False,
                default='company_images',
                enum=available_folders
            )
        ]
    )
    def create(self, request):
        image = request.FILES.get('image')
        folder = request.data.get('folder', 'company_images')
        accepted_extensions = ['jpg', 'jpeg', 'png']
        serializer = TemporaryImageUploadSerializer(data=request.data)

        if folder not in self.available_folders:
            return Response({"message": "Invalid folder"}, status=400)
        if not image:
            return Response({"message": "No image provided"}, status=400)

        if serializer.is_valid():
            image = serializer.validated_data['image']
            ext = image.name.split('.')[-1].lower()
            if ext not in accepted_extensions:
                return Response({"message": "Invalid file extension"}, status=400)

            # gera hash do conteúdo da imagem
            hasher = hashlib.sha256()
            for chunk in image.chunks():
                hasher.update(chunk)
            image_hash = hasher.hexdigest()
            image.seek(0)  # reset pointer do arquivo depois de ler

            filename = f"{image_hash}.{ext}"
            path = os.path.join(settings.MEDIA_ROOT, folder, filename)

            # se já existe, não salva de novo
            if os.path.exists(path):
                url = f"{settings.MEDIA_URL}{folder}/{filename}"
                return Response({"url": url, "message": "Image already exists"}, status=200)

            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'wb+') as f:
                for chunk in image.chunks():
                    f.write(chunk)

            url = f"{settings.MEDIA_URL}{folder}/{filename}"
            return Response({"url": url}, status=201)

        return Response(serializer.errors, status=400)
