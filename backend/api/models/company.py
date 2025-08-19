from django.db import models
from api.models.base_model import BaseModel
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
import pytz 
from django.core.validators import FileExtensionValidator

def get_default_work_days():
    return [0, 1, 2, 3, 4]

def get_local_time(hour, minute):
    return timezone.localtime(timezone.now()).time().replace(hour=hour, minute=minute)

TIMEZONE_CHOICES = [(tz, tz) for tz in pytz.all_timezones]

class Company(BaseModel):
    name = models.CharField(max_length=64, null=False, blank=False)
    identifier = models.CharField(max_length=64, null=False, blank=False, unique=True)
    description = models.CharField(max_length=264, null=False, blank=False)
    phone = models.CharField(max_length=15, null=False, blank=False)
    work_days = ArrayField(
    models.IntegerField(choices=[
        (0, 'Segunda'), (1, 'Terça'), (2, 'Quarta'), 
        (3, 'Quinta'), (4, 'Sexta'), (5, 'Sábado'), (6, 'Domingo')
    ]),
    default=get_default_work_days
    )
    opens_at = models.TimeField(default=get_local_time(hour=8, minute=0))
    closes_at = models.TimeField(default=get_local_time(hour=18, minute=0))
    timezone = models.CharField(max_length=64, null=False, blank=False, default="America/Sao_Paulo", choices=TIMEZONE_CHOICES)
    keywords = ArrayField(models.CharField(max_length=64, null=False, blank=False), default=list)
    image = models.ImageField(
        upload_to='company_images/',
        null=True,
        blank=True,
        default='company_images/default_company_image.png',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])],
    )
    banner = models.ImageField(
        upload_to='company_banners/',
        null=True,
        blank=True,
        default='company_banners/default_company_banner.jpg',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])],
    )
    primary_color = models.CharField(max_length=7, null=False, blank=False, default='#e7000b')
    is_active = models.BooleanField(default=True)
    address = models.CharField(max_length=255, null=False, blank=False)

    class Meta:
        db_table = 'company'



