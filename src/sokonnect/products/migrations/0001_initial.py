# Generated by Django 5.1.7 on 2025-03-21 22:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Product Name')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Product Description')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Price')),
                ('quantity', models.PositiveIntegerField(default=1, verbose_name='Quantity Available')),
                ('image', models.CharField(blank=True, max_length=255, null=True, verbose_name='Product Image Path')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL, verbose_name='Owner')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
            },
        ),
        migrations.CreateModel(
            name='MostPopular',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.PositiveIntegerField(unique=True, verbose_name='Rank')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='most_popular', to='products.product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Most Popular Product',
                'verbose_name_plural': 'Most Popular Products',
                'ordering': ['rank'],
            },
        ),
    ]
