from rest_framework import serializers
from api.models.employee import Employee
from api.views.service import Service

class ServiceSerializer(serializers.ModelSerializer):
    capable_employees = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = "__all__"

    def get_capable_employees(self, obj):
        employees = obj.capable_employees.all()
        return [{"id": employee.id, "name": employee.name, "email": employee.email} for employee in employees]

class PatchCapableEmployeesSerializer(serializers.ModelSerializer):
    capable_employees = serializers.PrimaryKeyRelatedField(
    many=True,
    queryset=Employee.objects.all()
    )

    class Meta:
        model = Service
        fields = ["capable_employees"]


