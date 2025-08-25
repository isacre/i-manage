
from datetime import timedelta
from api.models.booking import Booking, BookingStatus
from api.modules.company import CompanyModule
from api.serializers.booking import BookingSerializer
from api.utils.utils import generateBookedHours

    
class EmployeeModule:
    def __init__(self):
        pass

    def get_employee_bookings(self, company, opens_at, closes_at, capable_employees,interval):
        employees_email_list = [employee.get("email") for employee in capable_employees]
        opens_at = opens_at.replace(second=0, microsecond=0)
        bookings = Booking.objects.filter(company=company, start_date__gte=str(opens_at), end_date__lte=str(closes_at), employees__email__in=employees_email_list, status__in=[BookingStatus.CONFIRMED.value, BookingStatus.PENDING.value])
        serialized_bookings = BookingSerializer(bookings, many=True).data
        bookings_per_employee = {}

        # Group bookings by employee
        for booking in serialized_bookings:
          start = booking['start_date']
          end = booking['end_date']
          for employee in booking['employees']:
            if employee not in bookings_per_employee:
              bookings_per_employee[employee] = []
              bookings_per_employee[employee].append({'start': start, 'end': end})
        employee_busy_hours = []

        # Convert given start and end dates into busy time intervals (5 minutes)
        for employee in bookings_per_employee:
            for booking in bookings_per_employee[employee]:
                employee_busy_hours.extend(generateBookedHours(booking['start'], booking['end'], interval))

        # Given the list of employees (specific one or all), remove the hours that are not available for all employees in list 
        for busy_hour in employee_busy_hours:
           if employee_busy_hours.count(busy_hour) < len(employees_email_list):
              employee_busy_hours.remove(busy_hour)
        hours_list = sorted(list(set(employee_busy_hours)))

        return hours_list
