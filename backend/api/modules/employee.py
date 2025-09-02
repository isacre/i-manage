
from datetime import timedelta
from api.models.booking import Booking, BookingStatus
from api.modules.company import CompanyModule
from api.serializers.booking import BookingSerializer
from api.utils.utils import generateBookedHours


class EmployeeModule:
    def __init__(self):
        pass
    
    def _group_bookings_by_employee(bookings):
        """
        Takes a list of bookings and returns a dictionary with the employee as the key and the bookings as a value array
        """
        bookings_per_employee = {}
        for booking in bookings:
          start = booking['start_date']
          end = booking['end_date']
          employeees = booking['employees']
          for employee in employeees:
            if employee not in bookings_per_employee:
              bookings_per_employee[employee] = []
            bookings_per_employee[employee].append({'start': start, 'end': end})
        return bookings_per_employee
    
    def _get_employee_busy_intervals(bookings_per_employee, interval):
        """
        Takes a dictionary with the employee as the key and the bookings as a value array and returns a list of busy intervals for the employee
        """
        employee_busy_hours = []
        for employee in bookings_per_employee:
            for booking in bookings_per_employee[employee]:
                employee_busy_hours.extend(generateBookedHours(booking['start'], booking['end'], interval))
        return employee_busy_hours



    def get_employee_busy_intervals(self, company, opens_at, closes_at, capable_employees ,interval):
        employees_email_list = [employee.get("email") for employee in capable_employees]
        opens_at = opens_at.replace(second=0, microsecond=0)
        bookings = Booking.objects.filter(company=company, start_date__gte=str(opens_at), end_date__lte=str(closes_at), employees__email__in=employees_email_list, status__in=[BookingStatus.CONFIRMED.value, BookingStatus.PENDING.value])
        serialized_bookings = BookingSerializer(bookings, many=True).data
        bookings_per_employee = EmployeeModule._group_bookings_by_employee(serialized_bookings)
        busy_intervals = EmployeeModule._get_employee_busy_intervals(bookings_per_employee, interval)

        # Given the list of employees (specific one or all), remove the hours that are unavailable for all employees in list 
        for interval in busy_intervals:
           if busy_intervals.count(interval) < len(employees_email_list):
              busy_intervals.remove(interval)
        sorted_busy_intervals = sorted(list(set(busy_intervals)))

        return sorted_busy_intervals
    
    def get_employee_available_slots(self, company, opens_at, closes_at, capable_employees, interval, now, date):
        interval = timedelta(minutes=interval)
        booking_slot = CompanyModule.get_booking_start_time(self, now, date, opens_at)
        available_slots = []
        employee_busy_intervals = EmployeeModule.get_employee_busy_intervals(self, company, opens_at, closes_at, capable_employees, interval)
        
        while booking_slot + interval <= closes_at:
            if booking_slot >= opens_at:
                available_slots.append(booking_slot.format("HH:mm"))
            booking_slot += interval
        available_slots = [item for item in available_slots if  item not in employee_busy_intervals]
        return available_slots
