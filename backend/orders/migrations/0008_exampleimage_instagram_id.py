# Generated by Django 4.2.6 on 2023-11-01 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_alter_exampleimage_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='exampleimage',
            name='instagram_id',
            field=models.CharField(default=123, max_length=255, unique=True),
            preserve_default=False,
        ),
    ]
