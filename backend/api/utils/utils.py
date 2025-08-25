import array
from collections import defaultdict
from datetime import datetime, timedelta
import pytz
from typing import List
from api.models.booking import Booking
from api.models.employee import Employee
from api.models.service import Service
from api.serializers.booking import BookingSerializer
from api.serializers.service import ServiceSerializer

def translateDateToRFC3339(date: str):
    fuso_brasil = pytz.timezone("America/Sao_Paulo")
    dia_local = fuso_brasil.localize(datetime.strptime(date, "%Y-%m-%d"))
    time_min = dia_local.astimezone(pytz.utc).isoformat()
    time_max = (dia_local + timedelta(days=1)).astimezone(pytz.utc).isoformat()
    return time_min, time_max

def round_time_to_next_10min(time):
    rounded_minutes = (time.minute // 10) * 10 + 10
    if rounded_minutes >= 60:
        return time.shift(hours=1).replace(minute=0, second=0, microsecond=0)
    return time.replace(minute=rounded_minutes, second=0, microsecond=0)

def generateBookedHours(start, end, interval):
  booked_hours = []
  start = datetime.fromisoformat(start) - interval
  end = datetime.fromisoformat(end) + interval
  while start + interval < end:
    start += interval
    booked_hours.append(start.strftime("%H:%M"))
  return booked_hours

def filter_available_employees_for_slot(employee_ids, service_id, start_datetime_str):
    service = Service.objects.get(id=service_id)
    service_data = ServiceSerializer(service).data
    service_duration = int(service_data.get("max_duration", 0))

    start_datetime = datetime.fromisoformat(start_datetime_str)
    end_datetime = start_datetime + timedelta(minutes=service_duration)

    employees = Employee.objects.filter(id__in=employee_ids)
    employees_email_list = [e.email for e in employees]

    bookings = Booking.objects.filter(
        service_id=service_id,
        employees__email__in=employees_email_list,
        start_date__lt=end_datetime,
        end_date__gt=start_datetime
    ).distinct()

    busy_employee_ids = set()
    for booking in bookings:
        for employee in booking.employees.all():
            if employee.id in employee_ids:
                busy_employee_ids.add(employee.id)

    available_employees = [eid for eid in employee_ids if eid not in busy_employee_ids]
    return available_employees

def select_most_available_employees_to_book(service_id, start_date, end_date, date_parameter):
    datetime_start = start_date.datetime
    datetime_end = end_date.datetime  
    service = Service.objects.get(id=service_id)
    service_data = ServiceSerializer(service).data
    capable_employees = service_data.get("capable_employees")
    bookings_this_day = Booking.objects.filter(
        service_id=service_id,
        start_date__lt=datetime_end, 
        end_date__gt=datetime_start  
    )
    serialized_bookings = BookingSerializer(bookings_this_day, many=True)

    capable_employees_ids = [employee.get("id") for employee in capable_employees]


    employee_booking_count = defaultdict(int)
    for booking in serialized_bookings.data:
        for employee_id in booking["employees"]:
            if employee_id in capable_employees_ids:
                employee_booking_count[employee_id] += 1

    for emp_id in capable_employees_ids:
        employee_booking_count.setdefault(emp_id, 0)
    sorted_employees = sorted(employee_booking_count, key=lambda emp_id: employee_booking_count[emp_id])

    return sorted_employees