# Generated by Django 4.2.6 on 2023-10-31 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_alter_set_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exampleimage',
            name='url',
            field=models.URLField(unique=True),
        ),
    ]