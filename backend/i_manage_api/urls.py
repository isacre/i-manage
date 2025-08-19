from django.conf.urls import include
from django.conf import settings
from django.urls import path
from api.swagger import swagger_schema_view
from django.conf.urls.static import static
urlpatterns = [
    path("api/", include("api.urls")),
    path(
        "swagger/",
        swagger_schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)