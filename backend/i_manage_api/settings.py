from datetime import timedelta
from pathlib import Path
import os
import dj_database_url
from environ import Env

env = Env()
env.read_env()


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env("DEBUG")
ALLOWED_HOSTS = ["*"]


DATABASE_PORT = env("DATABASE_PORT", "5432")
DATABASE_NAME = env("DATABASE_NAME", "mydb")
DATABASE_USER = env("DATABASE_USER", "myuser")
DATABASE_PASS = env("DATABASE_PASS", "mypassword")
DATABASE_HOST = env("DATABASE_HOST", "localhost")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY", "")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = env("STRIPE_WEBHOOK_SECRET", "")
DOMAIN = env("DOMAIN", "http://localhost:3000") 
CORS_ALLOW_ALL_ORIGINS = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'payments.apps.PaymentsConfig',
    'i_manage_api',
    'rest_framework',
    'corsheaders',
    'djoser',
    'drf_yasg',
    'users',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'i_manage_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'i_manage_api.wsgi.application'


if env("DATABASE_URL"):
    DATABASES = {
        "default": dj_database_url.config(default=env("DATABASE_URL"))
    }
else:
    DATABASES = {
        "default": {        
            "ENGINE": "django.db.backends.postgresql",
            "NAME": DATABASE_NAME,
            "USER": DATABASE_USER,
            "PASSWORD": DATABASE_PASS,
            "HOST": DATABASE_HOST,
            "PORT": DATABASE_PORT,
        }
    }
AUTH_USER_MODEL = "users.User"

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'


USE_I18N = True

TIME_ZONE = 'America/Sao_Paulo'
USE_TZ = True



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

DJOSER = {
    'USER_ID_FIELD': 'id',  
    'SERIALIZERS': {
        'user': 'users.serializers.CustomUserSerializer',
        'current_user': 'users.serializers.CustomUserSerializer',
        'user_create': 'users.serializers.CustomUserCreateSerializer',
    },
    'TOKEN_MODEL': None,
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header',
            'description': 'JWT token format: Bearer <token>'
        }
    },
    'USE_SESSION_AUTH': False,
}

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'i_manage_api' / 'media'
