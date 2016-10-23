from .parseJobs import parseJobDetails, saveJob
from datetime import datetime


def stackoverflow():
    url = 'https://stackoverflow.com/jobs/feed?allowsremote=True'
    response = parseJobDetails(url, data_format='xml')

    items = response.getElementsByTagName('item')

    for node in items:
        job_url = node.getElementsByTagName("link")[0].childNodes[0].nodeValue

        name = node.getElementsByTagName("title")[0].childNodes[0].nodeValue
        name_index = name.find('at')
        name = name[0:name_index].strip()

        company = node.getElementsByTagName("a10:name")[0].childNodes[0].nodeValue
        text_html = node.getElementsByTagName("description")[0].childNodes[0].nodeValue
        text = text_html.replace('<br />', '')

        pubDate = node.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue
        date = datetime.strptime(pubDate, "%a, %d %b %Y %H:%M:%S Z")

        # if Job.objects.filter(date=date, name=name, company=company).first():
            # break

        skills_raw = node.getElementsByTagName("category")
        skills = [node_skill.childNodes[0].nodeValue for node_skill in skills_raw]

        saveJob(date, name, company, text, job_url, skills=skills, source="StackOverflow")


def github():
    url = 'https://jobs.github.com/positions.json?description=&location=remote'

    response = parseJobDetails(url, data_format='json')
    # items = response.getElementsByTagName('item')

    for node in response:

        job_url = node["url"]
        name = node["title"].replace('(Remote)', '').strip()

        company_name = node["company"]

        text_html = node["description"]
        text = text_html.replace('<br />', '')

        pubDate = node["created_at"]
        date = datetime.strptime(pubDate, "%a %b %d %H:%M:%S UTC %Y")

        # if Job.objects.filter(date=date, name=name, company=company).first():
            # break

        # skills = node.getElementsByTagName("category")

        company_url = node["company_url"]
        company_logo = node["company_logo"]

        saveJob(date, name, company_name, text, job_url, source="GitHub",
                company_url=company_url, company_logo=company_logo)
