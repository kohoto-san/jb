from rest_framework import serializers
from .models import *


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    keywords = KeywordSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ('id', 'slug', 'name', 'company_name', 'salary', 'exp', 'text', 'skills', 'keywords', 'url', 'source')


class JobListSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    keywords = KeywordSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ('id', 'slug', 'name', 'company_name', 'salary', 'exp', 'skills', 'keywords')


class LaneSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Lane
        fields = ('name', 'user')


class MetaJobSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = MetaJob
