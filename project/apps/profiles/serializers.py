from django.contrib.auth.models import User

from rest_framework import serializers
from apps.profiles.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('id', 'username', 'snippets')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
