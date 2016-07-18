from rest_framework import serializers
from apps.core.models import *


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword


class JobSerializer(serializers.ModelSerializer):
    # skills = SkillSerializer(many=True, read_only=True)
    # keywords = KeywordSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ('id', 'name', 'company', 'salary', 'exp', 'text')


class LaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lane


class MetaJobSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = MetaJob
