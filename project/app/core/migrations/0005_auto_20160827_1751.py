# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-27 17:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20160825_2054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='url',
            field=models.URLField(),
        ),
    ]
