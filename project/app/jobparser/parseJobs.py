import requests
# import xml.etree.ElementTree
from xml.dom.minidom import parseString
import re
import json

from django.http import HttpResponse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile


from app.core.models import Job, Skill, Keyword

from . import nltkutils


def parseJobDetails(url):
    r = requests.get(url)
    # e = xml.dom.minidom.parseString(r.text)
    e = parseString(r.text)
    return e


def analyzeJob(name, company, text):
    lvls = ['junior', 'middle', 'senior']
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

    r_company = requests.get('https://autocomplete.clearbit.com/v1/companies/suggest',
                             params={'query': company})

    company_info = json.loads(r_company.text)
    company_domain = company_info['domain']
    logo_url = company_info['logo']

    return salary, exp, company_domain, logo_url


def saveJob(date, name, company, text, job_url, skills, source):

    same_job = Job.objects.filter(url=job_url)
    # salary, exp, company_domain, logo_url = analyzeJob(name, company, text)

    if same_job:
        print('same_job; continue')
        print(same_job)
        return
        # break
    else:
        salary, exp, company_domain, logo_url = analyzeJob(name, company, text)

        job = Job(date=date, name=name[:250], company=company[:250], exp=exp,
                  salary=salary[:250], text=text, url=job_url, source=source)

        job.save()

        for skill in skills:
            obj, created = Skill.objects.get_or_create(name=skill.childNodes[0].nodeValue)
            job.skills.add(obj)

        keywords = nltkutils.analyze(total_text)

        for keyword in keywords:
            obj, created = Keyword.objects.get_or_create(name=keyword)
            job.keywords.add(obj)

        job.save()

        # logo_img_format = logo_url[-4:]

        # logo_img_temp = NamedTemporaryFile(delete=True)
        # logo_img_temp.write(urllib.request.urlopen(avatar_url).read())
        # logo_img_temp.flush()

        # job.logo.save(str(profile.id_profile) + str(img_format), File(img_temp))
