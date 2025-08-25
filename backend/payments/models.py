from django.db import models
from api.models.booking import Booking
class Payment(models.Model):
    class Meta:
        db_table = "payment"

    stripe_payment_id = models.CharField(max_length=255, unique=True)
    customer_id = models.CharField(max_length=255, null=True, blank=True)
    amount = models.IntegerField()
    currency = models.CharField(max_length=10)
    status = models.CharField(max_length=50)
    payment_method = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)