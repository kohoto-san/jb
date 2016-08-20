import requests
from datetime import datetime
# import xml.etree.ElementTree
import xml.dom
import re

from django.http import HttpResponse

from apps.core.models import Job, Skill, Keyword

from . import nltkutils


def parseJobs():

    lvls = ['junior', 'middle', 'senior']

    url = 'https://stackoverflow.com/jobs/feed?allowsremote=True'
    r = requests.get(url)
    e = xml.dom.minidom.parseString(r.text)
    items = e.getElementsByTagName('item')

    for node in items:

        job_url = node.getElementsByTagName("link")[0].childNodes[0].nodeValue

        same_job = Job.objects.filter(url=job_url)
        if same_job:
            print('==================')
            print('==================')
            print(same_job[0].name)
            print('==================')
            print('==================')
            break

        name = node.getElementsByTagName("title")[0].childNodes[0].nodeValue
        name_index = name.find('at')
        name = name[0:name_index].rstrip()

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
            salary = re.findall(r'\$\d+[k,K]|\$\d+\/\w+', text)[0]
        except IndexError:
            salary = None

        job = Job(date=date, name=name, company=company, salary=salary, exp=exp, text=text, url=job_url, source="StackOverflow")
        job.save()

        skills = node.getElementsByTagName("category")

        for skill in skills:
            obj, created = Skill.objects.get_or_create(name=skill.childNodes[0].nodeValue)
            job.skills.add(obj)

        keywords = nltkutils.analyze(total_text)

        for keyword in keywords:
            obj, created = Keyword.objects.get_or_create(name=keyword)
            job.keywords.add(obj)

        print(name)
        job.save()

    # return HttpResponse('objects')

parseJobs()
