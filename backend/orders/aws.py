import boto3
import botocore
import uuid
import imghdr
from django.conf import settings
from django.shortcuts import render, redirect


BUCKET_NAME = settings.S3_BUCKET
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "jpeg"}

s3 = boto3.client(
   "s3",
   aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
   aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY
)


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):

    filename = file.name

    if not allowed_file(filename):
      return {"errors": 'File type not allowed.'}

    file.name = get_unique_filename(filename)

    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.name,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return f"{S3_LOCATION}{file.name}"


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True

def upload_temp_to_s3(file, acl="public-read"):

    file_type = imghdr.what(None, h =file)

    # if not file_type in ALLOWED_EXTENSIONS:
    #   return {"errors": 'File type not allowed.'}
    filename = file.name
    file.name = get_unique_filename(filename)

    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.name,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return f"{S3_LOCATION}{file.name}"
