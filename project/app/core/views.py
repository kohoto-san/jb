from itertools import groupby
import collections
import json

from django.forms.models import model_to_dict
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import status

from .models import MetaJob, Lane, Job, Skill, Keyword
from .serializers import MetaJobSerializer, JobSerializer, JobListSerializer
from rest_framework import generics, viewsets, pagination, status

from rest_framework.views import APIView
from rest_framework.response import Response

from . import parseJobs
from django.http import HttpResponse


class MetaJobList(APIView):

    def get(self, request, format=None):

        jobs = MetaJob.objects.filter(lane__user=request.user).order_by('lane')
        serializer = MetaJobSerializer(jobs, many=True)

        data = jobs.values('id', 'job__slug', 'position', 'lane_id', 'lane__name',
                           'job_id', 'job__name', 'job__company', 'job__salary', 'job__exp')
        result = {'lanes': []}
        lanes = Lane.objects.filter(user=request.user).values('name', 'id')

        result2 = {'lanes': []}

        for lane in lanes:
            meta_lane = {}
            meta_lane['name'] = lane['name']
            meta_lane['id'] = lane['id']
            meta_lane.setdefault('jobs', [])
            for job in data:
                if(job['lane__name'] == lane['name']):
                    meta_lane['jobs'].append(job)
            result2['lanes'].append(meta_lane)

        for key, group in groupby(data, lambda x: x['lane__name']):
            lane = {}
            lane['name'] = key
            for thing in group:
                lane['id'] = thing['lane_id']
                # thing.setdefault('id', thing['job_id'])
                lane.setdefault('jobs', []).append(thing)
            result['lanes'].append(lane)

        # print(result2)
        # print(result)

        return Response(result2)
        # return Response(serializer.data)

    # attachToLaneServer
    def patch(self, request):
        # res = json.loads(request.data)
        source_job = get_object_or_404(MetaJob, pk=request.data['sourceId'])

        if 'targetId' in request.data:
            target_job = get_object_or_404(MetaJob, pk=request.data['targetId'])
            target_lane = target_job.lane
            source_job.position, target_job.position = target_job.position, source_job.position
            target_job.save()
        elif 'laneId' in request.data:
            source_job.position = 0
            target_lane = get_object_or_404(Lane, pk=request.data['laneId'])
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if(source_job.lane != target_lane):
            source_job.lane = target_lane

        source_job.save()

        return Response('ok')

    # Like
    def post(self, request):
        # res = json.loads(request.data)
        source_job = get_object_or_404(Job, pk=request.data['sourceId'])
        lane = get_object_or_404(Lane, user=request.user, name='Liked')

        metajob = MetaJob.objects.filter(job=source_job, lane__user=request.user)
        if metajob:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            position = lane.metajob_set.latest('position').position
        except MetaJob.DoesNotExist:
            position = 0

        job = MetaJob(job=source_job, lane=lane, position=position)
        job.save()

        # metajob_json = model_to_dict(job, fields=[field.name for field in job._meta.fields])
        # metajob_json = model_to_dict(job, fields=['position', 'lane__name'])

        metajob_json = {
            'id': job.id,
            'job__slug': job.job.slug,
            'position': job.position,
            'lane_id': job.lane_id,
            'lane__name': job.lane.name,
            'job_id': job.job_id,
            'job__name': job.job.name,
            'job__company': job.job.company,
            'job__salary': job.job.salary,
            'job__exp': job.job.exp
        }

        return Response({"laneId": lane.id, "metajob": metajob_json, "jobId": job.id, "position": position})

        # if 'laneName' in request.data:
            # source_job.position = 0
            # target_lane = get_object_or_404(Lane, pk=request.data['laneName'], user=request.user)

            # source_job.lane = target_lane
            # source_job.save()

        # else:
            # return Response(status=status.HTTP_404_NOT_FOUND)

    # def delete(self, request):
    #     job = get_object_or_404(MetaJob, pk=request.data['id'])
    #     job.delete()
    #     return Response('deleted')

#class MetaJobList(generics.ListAPIView):
#    queryset = MetaJob.objects.all()
#    serializer_class = MetaJobSerializer


#class MetaJobViewSet(viewsets.ModelViewSet):
#   queryset = MetaJob.objects.all()

class JobListPagination(pagination.PageNumberPagination):
    page_size = 50


class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-date')
    serializer_class = JobListSerializer
    pagination_class = JobListPagination


class JobDetails(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


def parseJobsView(request):
    parseJobs.parseJobs()
    return HttpResponse('ok')
