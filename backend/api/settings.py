"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
import dj_database_url
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# For ease of reference in using WhiteNoise
BACKEND_DIR = BASE_DIR  # rename variable for clarity
FRONTEND_DIR = BASE_DIR.parent / 'frontend'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', default='team5forever')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = 'RENDER' not in os.environ

# For ease of use in development
ALLOWED_HOSTS = ['localhost']

# Adds Render site name in production to allowed hosts
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition

# See https://whitenoise.readthedocs.io/en/latest/django.html
# for explanations of the values we added here to serve React

# WhiteNoise placed before staticfiles
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'corsheaders',
    'orders',
    'admin_extra_buttons',
    'drf_recaptcha'
]

# CORS must go before anything that generates responses
# Whitenoise should be placed right after SecurityMiddleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Added stuff rom here...
STATICFILES_DIRS = [FRONTEND_DIR / 'build' / 'static']

STORAGES = {
    # Allows WhiteNoise to do its job of compressing and hashing
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
    "default": "storages.backends.filebased.FileSystemStorage"
}

STATIC_ROOT = BACKEND_DIR / 'static'
WHITENOISE_ROOT = FRONTEND_DIR / 'build' / 'root'
# ...to here for deployment

# Again, if curious, reference the doc shared above.

# As the React is being served by Django,
# there is no longer a need to enable resource sharing.

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
#     "http://localhost:8000",
# ]

# Don't know what this is for. - John
# CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS' value added so that Django knows where to find
        # the index.html file when it tries to serve React
        'DIRS': [FRONTEND_DIR / 'build'],
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

WSGI_APPLICATION = 'api.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASE_URL = os.environ.get("DATABASE_URL") if not DEBUG else 'sqlite:///db.sqlite3'

DATABASES = {
  # This allows us to use sqlite in development
  # and postgres in production.

  # The conn_max_age keyword keeps the connection to the
  # database open for the specified time, good for
  # successive database requests.

  # The conn_health_checks keyword checks that if a connection
  # is open in this way, that it is verified before
  # another request is sent through.

	"default": dj_database_url.parse(
        DATABASE_URL,
        conn_max_age=600,
        conn_health_checks=True)
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#EMAIL API
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')

#INSTAGRAM API
INSTAGRAM_APP_ID = os.environ.get('INSTAGRAM_APP_ID')
INSTAGRAM_APP_SECRET = os.environ.get('INSTAGRAM_APP_SECRET')

ADMIN_LOGIN_NAME = os.environ.get('ADMIN_LOGIN_NAME')
ADMIN_LOGIN_EMAIL = os.environ.get('ADMIN_LOGIN_EMAIL')
ADMIN_LOGIN_PASSWORD = os.environ.get('ADMIN_LOGIN_PASSWORD')

#RECAPTCHA
DRF_RECAPTCHA_SECRET_KEY = os.environ.get("DRF_RECAPTCHA_SECRET_KEY")

#AWS
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET = os.environ.get('S3_BUCKET')

CSRF_TRUSTED_ORIGINS = ['http://localhost:8000/', 'https://stephyxnails.onrender.com/']

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

#Media
MEDIA_ROOT = os.path.join(BASE_DIR,'media')
