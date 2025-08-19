from django.db import models
from api.models.base_model import BaseModel
from api.models.company import Company
from api.models.employee import Employee
from api.models.service import Service
from users.models import User


class BookingStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    CONFIRMED = "CONFIRMED", "Confirmed"
    CANCELED = "CANCELED", "Canceled"
    COMPLETED = "COMPLETED", "Completed",
    EXPIRED = "EXPIRED", "Expired",


class Booking(BaseModel):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    company = models.ForeignKey(Company, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING)
    employees = models.ManyToManyField(Employee)
    status = models.CharField(
        max_length=20, 
        choices=BookingStatus.choices, 
        default=BookingStatus.PENDING
    )
    
    class Meta:
        db_table = 'booking'

