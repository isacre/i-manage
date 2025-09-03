import json
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from api.models.booking import Booking
import os
from dotenv import load_dotenv, set_key
from api.models.employee import Employee
from api.models.service import Service
from api.serializers.booking import BookingSerializer
from api.serializers.service import ServiceSerializer
from api.utils.utils import generateBookedHours


from users.models import User

load_dotenv()

SCOPES = ["https://www.googleapis.com/auth/calendar"]

token_data = {
    "token": os.getenv("CALENDAR_TOKEN"),
    "refresh_token": os.getenv("CALENDAR_REFRESH_TOKEN"),
    "client_id": os.getenv("CALENDAR_CLIENT_ID"),
    "client_secret": os.getenv("CALENDAR_CLIENT_SECRET"),
    "token_uri": "https://oauth2.googleapis.com/token",
    "scopes": [
    "https://www.googleapis.com/auth/calendar.readonly"
  ],
    "universe_domain": "googleapis.com",
    "account": "",
    "expiry": "2025-04-23T14:49:55.361329Z"
  }
  
credentials_data = {
    "installed": {
        "client_id": os.getenv("CALENDAR_CLIENT_ID"),
        "project_id": os.getenv("CALENDAR_PROJECT_ID"),
        "client_secret": os.getenv("CALENDAR_CLIENT_SECRET"),
        "redirect_uris": [os.getenv("CALENDAR_REDIRECT_URI")],
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
    }
  }

def get_credentials():
    authentication = Credentials.from_authorized_user_info(token_data, SCOPES)
    if not authentication or not authentication.valid:
        if authentication and authentication.expired and authentication.refresh_token:
            authentication.refresh(Request())
            set_key(".env", "CALENDAR_TOKEN", authentication.token)
            set_key(".env", "CALENDAR_TOKEN_EXPIRY", authentication.expiry.isoformat())
        else:
            flow = InstalledAppFlow.from_client_config(credentials_data, SCOPES)
            authentication = flow.run_local_server(port=0)
            set_key(".env", "CALENDAR_TOKEN", authentication.token)
            set_key(".env", "CALENDAR_REFRESH_TOKEN", authentication.refresh_token)
            set_key(".env", "CALENDAR_TOKEN_EXPIRY", authentication.expiry.isoformat())

    return authentication

def create_event(booking: Booking):
  authentication = get_credentials()
  user = User.objects.get(id=booking.user.id)
  employees = Employee.objects.filter(id__in=booking.employees.all())
  emails = [{"email": employee.email} for employee in employees]
  emails.append({"email": user.email})
  booking_data = BookingSerializer(booking).data
  product_data = ServiceSerializer(booking.service).data
  try:
    service = build("calendar", "v3", credentials=authentication)
    created_event = (
        service.events()
        .insert(
            calendarId="primary",
            body={
                "summary":product_data["name"],
                "description": product_data["description"],
                "start": {
                    "dateTime": booking_data["start_date"],
                    "timeZone": "America/Sao_Paulo"
                },
                "end": {
                    "dateTime": booking_data["end_date"],
                    "timeZone": "America/Sao_Paulo"
                },
               
                "reminders": {
                    "useDefault": False,
                    "overrides": [
                        {
                            "method": "email",
                            "minutes": 24 * 60
                        }
                    ]
                },
                "attendees": emails,
            }
        )
        .execute()
    )
    booking.calendar_event = created_event.get("id")
    booking.save()
    return created_event
  
  except HttpError as error:
    print(f"An error occurred: {error}")
    raise error
  
def delete_event(booking: Booking):
  authentication = get_credentials()
  try:
    service = build("calendar", "v3", credentials=authentication)
    service.events().delete(calendarId="primary", eventId=booking.calendar_event, sendUpdates="all").execute()
  except HttpError as error:
    print(f"An error occurred: {error}")

def get_events(company_id: int, timeMin: str, timeMax: str):
  creds = get_credentials()
  service = build("calendar", "v3", credentials=creds)
  events = service.events().list(calendarId="primary", maxResults=2, timeMin=timeMin, timeMax=timeMax).execute()
  
  return events.get("items", [])



def get_busy_hours(timeMin: str, timeMax: str, service: Service, capable_employees: list):
  service_duration = service.max_duration
  creds = get_credentials()
  api = build("calendar", "v3", credentials=creds)
  email_list = capable_employees
  body = {
    "timeMin": timeMin.isoformat(), 
    "timeMax": timeMax.isoformat(), 
    "timeZone": "America/Sao_Paulo",
    "items": [{"id": email} for email in email_list]
}

  try:
    response = api.freebusy().query(body=body).execute()
  except HttpError:
    return []
  response = json.dumps(response)
  calendars = (json.loads(response)["calendars"])
  all_employees_booked_hours = []

  for calendar in calendars:
    for booking in calendars[calendar]["busy"]:
      unavailable = generateBookedHours(booking["start"], booking["end"], service_duration)
      all_employees_booked_hours.extend(unavailable)
  unique_booked_hours = list(set(all_employees_booked_hours))

  for value in unique_booked_hours:
    if all_employees_booked_hours.count(value) < len(calendars):
      unique_booked_hours.remove(value)
  
  sorted_hours = sorted(unique_booked_hours)
  return sorted_hours


