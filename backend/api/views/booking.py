
from requests import delete
from api.integrations.stripe.service import create_checkout_session, refund_payment, verify_checkout_session
from api.models.booking import Booking, BookingStatus
from api.models.company import Company
from api.models.service import Service
from api.modules.company import CompanyModule
from api.modules.employee import EmployeeModule
from api.serializers.booking import BokingUpdateStatusSerializer, BookingCreateSerializer, BookingDeleteAgendaSerializer, BookingSerializer, ConfirmedBookingSerializer    
from rest_framework import viewsets
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import api.integrations.google_calendar.service as google_calendar
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from api.serializers.service import ServiceSerializer
from api.utils.utils import  check_employee_availability, select_most_available_employee
from payments.models import Payment
from users.models import User

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def get_serializer_class(self):
        if self.action == "patchBookingStatus":
            return BokingUpdateStatusSerializer
        if self.action == "deleteAgenda":
            return BookingDeleteAgendaSerializer
        return BookingSerializer
    
    @action(methods=["POST"], detail=False, url_path="bookService")
    def bookService(self, request):
       serializer = BookingCreateSerializer(data=request.data)
       data = request.data.copy()
       company = Company.objects.get(identifier=request.data["company"])
       service = Service.objects.get(pk=request.data["service"])
       date_parameter = data.get("start_date").split(" ")[0]
       date, opens_at, closes_at, _ = CompanyModule.get_company_hours(self, date_parameter, company, service.max_duration)
       employees = data.pop("employees")
       if not employees:
           employees = [select_most_available_employee(service.id, opens_at, closes_at, date)]
       employee_is_available = check_employee_availability(employees[0], opens_at, closes_at)
       if not employee_is_available:
           return Response({"error": "Employee is not available at that time"}, status=400)
       user = User.objects.filter(pk=request.data["user"]).first()
       data["service"] = service
       data["company"] = company
       data["user"] = user
       booking = Booking.objects.create(**data)
       booking.employees.set(employees)
       session = create_checkout_session(service.name, service.description, service.price, user.email)
       booking.session_id = session.id
       
       if serializer.is_valid(raise_exception=True): 
          google_calendar.create_event(booking)
          booking.save()
          return Response({"sessionId": session.id, "url": session.url}, status=200)
       return Response(serializer.errors, status={400})

    @swagger_auto_schema(
        method="GET",
        manual_parameters=[
            openapi.Parameter("status", openapi.IN_QUERY, description="Status of the bookings", type=openapi.TYPE_STRING, enum=BookingStatus.choices)
        ]
    )
    @action(methods=["GET"] ,detail=True)
    def getBookings(self, request, pk=None):
        status = request.GET.get("status")
        user_id = request.GET.get("user")
        bookings = Booking.objects.filter(company=pk).order_by("-created_at")
        if status:
            bookings = bookings.filter(status=status)
        if user_id:
            bookings = bookings.filter(user=user_id)
        return Response(BookingSerializer(bookings, many=True).data)



    @action(methods=["GET"], detail=True)
    def getAvailableHours(self, request, pk=None):
        date_parameter = request.GET.get("date")
        preferred_employee_parameter = request.GET.get("preferred_employee")
        service = Service.objects.get(pk=pk)
        capable_employees = ServiceSerializer(service).data.get("capable_employees")
        if preferred_employee_parameter:
            capable_employees = [employee for employee in capable_employees if employee.get("id") == int(preferred_employee_parameter)]

        company = Company.objects.get(pk=service.company.id)
        date, opens_at, closes_at, now = CompanyModule.get_company_hours(self, date_parameter, company, service.max_duration)
        available_slots = EmployeeModule.get_employee_available_slots(self, company, opens_at, closes_at, capable_employees, 15, now, date)
        response = {
            'available_slots': available_slots,
            'capable_employees': ServiceSerializer(service).data.get("capable_employees"),
        }

        return Response(response)
    
    @action(methods=["PATCH"], detail=True)
    def patchBookingStatus(self, request, pk=None):
        try:
            booking = Booking.objects.get(pk=pk)
            request_status = request.data.get("status")
            if request_status == BookingStatus.CANCELED.value and booking.status in [BookingStatus.CONFIRMED.value, BookingStatus.PENDING.value]:
                google_calendar.delete_event(booking)
                if booking.payment:
                    payment = Payment.objects.get(pk=booking.payment_id)
                    if(payment.status == "paid"):
                        refund_payment(payment.stripe_payment_id)
            if request_status == BookingStatus.CONFIRMED.value:
                google_calendar.create_event(booking)
            booking.status = request_status
            booking.save()
            return Response(BookingSerializer(booking).data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)
        

    @action(methods=["GET"], detail=False)
    def getBookingBySessionId(self, request, pk=None):
        session_id = request.GET.get("session_id")
        try:
            booking = Booking.objects.get(session_id=session_id)
            return Response(ConfirmedBookingSerializer(booking).data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    @action(methods=["GET"], detail=False)
    def retrievePaymentUrlWithSessionId(self, request, pk=None):
        session_id = request.GET.get("session_id")
        payment_url = verify_checkout_session(session_id)
        return Response({"url": payment_url}, status=200)
    

    @action(methods=["POST"], detail=False)
    def deleteAgenda(self, request, pk=None):
        calendar_event = request.data.get("calendar_event")
        booking = Booking.objects.get(calendar_event=calendar_event)
        google_calendar.delete_event(booking)
        return Response(BookingSerializer(booking).data, status=200)
    
