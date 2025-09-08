from api.models.company import Company
from rest_framework import viewsets
from rest_framework.response import Response
from api.serializers.company import CompanyRegisterSerializer, CompanySerializer
from rest_framework.decorators import action
from rest_framework import status, permissions
from django.contrib.auth.hashers import make_password
from django.db import transaction
from typing import Dict, Any
from rest_framework.request import Request
from django.core.exceptions import ValidationError

from users.models import User

class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def _create_company(self, data: Dict[str, Any]) -> Company:
        identifier = data['identifier']
        if "." in identifier:
            raise ValidationError("Identifier cannot contain dots")
        company = Company.objects.create(
            name=data['name'],
            description=data['description'],
            phone=data['phone'],
            identifier=data['identifier'],
            address=data['address'],
            timezone=data['timezone'],
        )
    
        return company

    def _create_user(self, data: Dict[str, Any], company: Company) -> User:
        return User.objects.create(
            email=data['email'],
            password=make_password(data['password']),
            name=data['name'],
            phone=data['phone'],
            company=company,
            role='OWNER'
        )

    def get_permissions(self) -> list[permissions.BasePermission]:
        if self.action == 'register_company':
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self) -> type:
        if self.action == 'register_company':
            return CompanyRegisterSerializer
        return CompanySerializer


    @action(methods=["POST"], detail=False)
    def register_company(self, request: Request) -> Response:
        data = request.data.copy()
        try:
            with transaction.atomic():
                """ 
                User already has an account but doesn't have a company
                """
                try:
                    user = User.objects.get(email=data['email'])
                    if user.company:
                        return Response(
                            {"message": "A company with this email already exists"}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    
                    company = self._create_company(data)
                    serializer = self.get_serializer_class()(data=data)
                    
                    if serializer.is_valid(raise_exception=True):
                        company.save()
                        user.company = company
                        user.save()
                except User.DoesNotExist:
                    company = self._create_company(data)
                    serializer = self.get_serializer_class()(data=data)
                    if serializer.is_valid(raise_exception=True):
                        company.save()
                        user = self._create_user(data, company)
                        user.save()
                
                return Response(
                    CompanySerializer(company).data, 
                    status=status.HTTP_201_CREATED
                )
                
        except ValidationError as e:
            return Response(
                {"message": "Invalid company registration data", "errors": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": "Company could not be registered", "errors": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    @action(methods=["GET"], detail=False)
    def get_company_by_identifier(self, request: Request) -> Response:
        identifier = request.query_params.get('identifier')
        try:
            company = Company.objects.get(identifier=identifier)
            return Response(CompanySerializer(company).data)
        except Company.DoesNotExist:
            return Response({"message": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": "Company could not be found", "errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    """
    Upload a logo, save it in the files folder and return the url
    """


       

        


