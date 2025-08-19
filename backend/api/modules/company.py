from datetime import datetime, timedelta
import arrow
from api.models.booking import Booking
from api.utils.utils import round_time_to_next_10min
from dateutil import tz, parser

class CompanyModule:
    def __init__(self):
        pass

    def get_booking_start_time(self, now, target_date, opens_at):
       """
       Defines the first available for booking, if the selected date is today, the next rounded available slot, if not, the moment the company opens at
       """
       if now.date() == target_date:
           return round_time_to_next_10min(now)
       return opens_at

    def get_company_hours(self, date_str, company, service_max_duration):
       """
       Returns date, opens_at and closes_at formatted with timezone for datetime manipulation.
       """
       timezone = tz.gettz('America/Sao_Paulo')
       now = arrow.now(timezone)
       date = parser.parse(date_str).date()
       opens_at = arrow.get(datetime.combine(date, company.opens_at), tzinfo=timezone)

       closes_datetime = datetime.combine(date, company.closes_at)
       closes_at = arrow.get(closes_datetime - timedelta(minutes=service_max_duration), tzinfo=timezone)

       return date, opens_at, closes_at, now


       