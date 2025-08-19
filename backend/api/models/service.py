from django.db import models
from api.models.base_model import BaseModel
from api.models.company import Company
from api.models.employee import Employee

class Service(BaseModel):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=264)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    max_duration = models.IntegerField(blank=False, null=False)
    capable_employees = models.ManyToManyField(Employee, related_name='capable_employees', default=[])
    required_employee_amount = models.IntegerField(blank=False, null=False)
    price = models.FloatField(blank=False, null=False)
    
    class Meta:
        db_table = 'service'

