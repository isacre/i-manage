from django.db import models
from api.models.base_model import BaseModel
from api.models.company import Company

class Employee(BaseModel):
    name = models.CharField(max_length=64)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    class Meta:
        db_table = 'employee'

