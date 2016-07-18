from itertools import groupby
import collections
import json


from django.shortcuts import render, get_object_or_404
from django.http import Http404


from apps.core.models import MetaJob, Job, Lane
from apps.core.serializers import MetaJobSerializer, JobSerializer
from rest_framework import generics, viewsets

from rest_framework.views import APIView
from rest_framework.response import Response


class MetaJobList(APIView):

    def get(self, request, format=None):
        jobs = MetaJob.objects.all().order_by('lane')
        serializer = MetaJobSerializer(jobs, many=True)

        data = jobs.values('id', 'position', 'lane_id', 'lane__name',
                           'job_id', 'job__name', 'job__company', 'job__salary', 'job__exp')
        result = {'lanes': []}
        lanes = Lane.objects.all().values('name', 'id')

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

        print(result2)
        print(result)

        return Response(result2)
        # return Response(serializer.data)

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

        if(source_job.lane != target_lane):
            source_job.lane = target_lane

        source_job.save()

        return Response('ok')


#class MetaJobList(generics.ListAPIView):
#    queryset = MetaJob.objects.all()
#    serializer_class = MetaJobSerializer


#class MetaJobViewSet(viewsets.ModelViewSet):
#   queryset = MetaJob.objects.all()

class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


