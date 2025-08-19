from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

swagger_schema_view = get_schema_view(
    openapi.Info(
        title=_("iManage API"),
        default_version="v0.1",
        description="Versão inicial de desenvolvimento",
        contact=openapi.Contact(email="isaacalvesx7@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=(JWTAuthentication,),
)


class XcodeAutoSchema(SwaggerAutoSchema):
    python_template = None
    curl_template = None

    def get_operation(self, operation_keys=None):
        assert (
            self.python_template
        ), "All SwaggerAutoSchema class must define python_template filed in it"
        assert (
            self.curl_template
        ), "All SwaggerAutoSchema class must define curl_template filed in it"

        operation = super().get_operation(operation_keys)

        template_context = {
            "request_url": self.request._request.build_absolute_uri(self.path),
        }

        operation.update(
            {
                "x-code-samples": [
                    {
                        "lang": "curl",
                        "source": render_to_string(
                            self.curl_template, template_context
                        ),
                    },
                    {
                        "lang": "python",
                        "source": render_to_string(
                            self.python_template, template_context
                        ),
                    },
                ]
            }
        )
        return operation

