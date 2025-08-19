from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from api.models.service import Service
from api.serializers.service import PatchCapableEmployeesSerializer, ServiceSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


    def get_queryset(self):
        if self.request.method == "PATCH":
            return self.queryset
        return self.queryset.filter()
    
    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return PatchCapableEmployeesSerializer
        return ServiceSerializer
    
    identifier_param = openapi.Parameter(
     "identifier",
     openapi.IN_QUERY,
     description="Find services by company identifier",
     type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(
        manual_parameters=[identifier_param]
    )
    @action(methods=["GET"], detail=False)
    def get_services_by_identifier(self, request: Request) -> Response:
        identifier = request.query_params.get("identifier")
        service = self.queryset.filter(company__identifier=identifier)
        return Response(ServiceSerializer(service, many=True).data)
 