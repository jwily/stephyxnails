# Generated by Django 4.2.6 on 2023-10-24 17:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('canceled', 'Canceled'), ('completed', 'Completed')], default='pending', max_length=15),
        ),
        migrations.AddField(
            model_name='set',
            name='order',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sets', to='orders.order'),
            preserve_default=False,
        ),
    ]