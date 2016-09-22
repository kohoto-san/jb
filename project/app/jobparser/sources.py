from .parseJobs import parseJobDetails, saveJob
from datetime import datetime


def stackoverflow():
    url = 'https://stackoverflow.com/jobs/feed?allowsremote=True'
    response = parseJobDetails(url)

    items = response.getElementsByTagName('item')

    for node in items:
        job_url = node.getElementsByTagName("link")[0].childNodes[0].nodeValue

        name = node.getElementsByTagName("title")[0].childNodes[0].nodeValue
        name_index = name.find('at')
        name = name[0:name_index].rstrip()

        company = node.getElementsByTagName("a10:name")[0].childNodes[0].nodeValue
        text_html = node.getElementsByTagName("description")[0].childNodes[0].nodeValue
        text = text_html.replace('<br />', '')

        pubDate = node.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue
        date = datetime.strptime(pubDate, "%a, %d %b %Y %H:%M:%S Z")

        # if Job.objects.filter(date=date, name=name, company=company).first():
            # break

        skills = node.getElementsByTagName("category")
        return saveJob(date, name, company, text, job_url, skills, source="StackOverflow")


def github():
    pass
