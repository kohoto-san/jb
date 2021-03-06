from django.shortcuts import render

# Create your views here.


import requests
from datetime import datetime
# import xml.etree.ElementTree
from xml.dom.minidom import parseString
import re

from django.http import HttpResponse

from .models import Job, Skill, Keyword

from . import nltkutils


def parseJobs():

    lvls = ['junior', 'middle', 'senior']

    url = 'https://stackoverflow.com/jobs/feed?allowsremote=True'
    r = requests.get(url)
    # e = xml.dom.minidom.parseString(r.text)
    e = parseString(r.text)
    items = e.getElementsByTagName('item')

    for node in items:

        job_url = node.getElementsByTagName("link")[0].childNodes[0].nodeValue
        print(job_url)

        same_job = Job.objects.filter(url=job_url)
        if same_job:
            print('same_job; continue')
            print(same_job)
            continue
            # break

        name = node.getElementsByTagName("title")[0].childNodes[0].nodeValue
        name_index = name.find('at')
        name = name[0:name_index].rstrip()

        print(name)

        company = node.getElementsByTagName("a10:name")[0].childNodes[0].nodeValue
        text_html = node.getElementsByTagName("description")[0].childNodes[0].nodeValue
        text = text_html.replace('<br />', '')

        pubDate = node.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue
        date = datetime.strptime(pubDate, "%a, %d %b %Y %H:%M:%S Z")

        if Job.objects.filter(date=date, name=name, company=company).first():
            break

        total_text = ''.join([name, text])

        exp = None
        for lvl in lvls:
            if lvl in total_text:
                exp = lvl
                break

        try:
            #                      $100K | $30/h
            salary = re.findall(r'\$\d+[kK]|\$\d+\/\w+', text)[0]
        except IndexError:
            salary = None

        if salary:
            salary = salary[:250]

        if exp:
            exp = exp[:250]

        job = Job(date=date, name=name[:250], company=company[:250], salary=salary, exp=exp, text=text, url=job_url, source="StackOverflow")
        job.save()

        skills = node.getElementsByTagName("category")

        for skill in skills:
            obj, created = Skill.objects.get_or_create(name=skill.childNodes[0].nodeValue)
            job.skills.add(obj)

        keywords = nltkutils.analyze(total_text)

        for keyword in keywords:
            obj, created = Keyword.objects.get_or_create(name=keyword)
            job.keywords.add(obj)

        job.save()

    # return HttpResponse('objects')

# parseJobs()
