from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, primary_key=True)

    oauth_token = models.CharField(max_length=200)
    oauth_secret = models.CharField(max_length=200)
