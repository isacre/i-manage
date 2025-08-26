from datetime import datetime
from api.models.booking import BookingStatus
from api.models.employee import Employee
from api.serializers.employee import EmployeeSerializer
from api.serializers.service import ServiceSerializer
from api.views.booking import Booking
from rest_framework import serializers
from django.utils import timezone

from users.models import User
from payments.models import Payment
from payments.serializers import PaymentSerializer
from users.serializers import CustomUserSerializer

class BookingSerializer(serializers.ModelSerializer):
    preferred_employee = serializers.ListField(required=False)
    service_name = serializers.SerializerMethodField()
    employee_names = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = "__all__"

    def get_service_name(self, obj):
        return obj.service.name
    """ 
    def get_status(self, obj):
        if obj.status == BookingStatus.PENDING:
            if obj.start_date < timezone.now():
                return BookingStatus.EXPIRED
            if obj.start_date > timezone.now():
                return BookingStatus.PENDING
        return obj.status.value """
    
    def get_employee_names(self, obj):
        return [employee.name for employee in obj.employees.all()]


class ConfirmedBookingSerializer(serializers.ModelSerializer):
    payment_details = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    store_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ['id', 'client_name', 'payment_details', 'store_name']
    
    def get_payment_details(self, obj):
        payment = Payment.objects.get(pk=obj.payment_id)
        serialized = PaymentSerializer(payment).data
        return {
            "amount": serialized["amount"] / 100,
            "currency": serialized["currency"],
            "status": serialized["status"],
            "payment_method": serialized["payment_method"],
            "payment_id": serialized["stripe_payment_id"],
            "timestamp": serialized["created_at"],
        }

    def get_client_name(self, obj):
        return obj.user.name

    def get_store_name(self, obj):
        return obj.company.name

class BookingCreateSerializer(serializers.ModelSerializer):
    company = serializers.CharField()
    employees = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Employee.objects.all(),
        required=False,
        allow_empty=True
    )
    class Meta:
        model = Booking
        exclude = ["id"]

class BookingReturnSerializer(serializers.ModelSerializer):
    service = serializers.SerializerMethodField()
    employees = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = "__all__"

    def get_service(self, obj):
        return ServiceSerializer(obj.service).data

    def get_employees(self, obj):
        return EmployeeSerializer(obj.employees, many=True).data

    def get_user(self, obj):
        return CustomUserSerializer(obj.user).data
    

class BokingUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["status"]
