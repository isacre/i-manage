from rest_framework import viewsets
from api.models.employee import Employee
from api.serializers.employee import EmployeeSerializer
from django_filters.rest_framework import DjangoFilterBackend

class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['company'] 
