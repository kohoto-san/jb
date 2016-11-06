import requests
# import xml.etree.ElementTree
from xml.dom.minidom import parseString
import re
import json

from django.http import HttpResponse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.db import DataError
from urllib.parse import urlparse
import urllib.request
from scrapy.selector import Selector

import dns.resolver
from ipwhois import IPWhois

from app.core.models import Job, Skill, Keyword, Company, Technology, TechnologyCategory, Location

from . import nltkutils
from . import wappalyzer
from . import wappalyzer_fork
from . import analyzeTags


def parseJobDetails(url, data_format):
    r = requests.get(url)
    # e = xml.dom.minidom.parseString(r.text)

    if data_format == 'xml':
        e = parseString(r.text)

    if data_format == 'json':
        e = json.loads(r.text)

    return e


def _parseWhois(domain):

    location = None
    phone = None

    for address_type in ['A', 'AAAA']:
        try:
            answers = dns.resolver.query(domain, address_type)
            for rdata in answers:
                ip = rdata
                break
        except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN) as e:
            ip = None

        if ip:
            whois = IPWhois(ip).lookup_rdap(depth=1)

            for ripe_id, value in whois['objects'].items():
                if phone or location is None:
                    if location is None:
                        try:
                            location = value['contact']['address'][0]['value']
                        except TypeError:
                            location = None

                    if phone is None:
                        try:
                            phone = value['contact']['phone'][0]['value'].split(';')[0]
                        except TypeError:
                            phone = None
                else:
                    break

    if location:
        location_list = location.split('\n')
        location_result = {'full_location': location[:250]}
        try:
            location_result['street'] = location_list[0][:250]
            location_result['city'] = location_list[1][:250]
            location_result['state_abbreviation'] = location_list[2][:250]
            location_result['zip_code'] = location_list[3][:250]
            location_result['country'] = location_list[4][:250]
        except IndexError:
            pass
    else:
        location_result = None

    return location_result, phone


def _parseLinkedin(company_name):
    url = 'https://www.linkedin.com/ta/federator?verticalSelector=companies&query='
    r_linkedin = requests.get(url + company_name)

    try:
        results = json.loads(r_linkedin.text)['resultList'][0]
    except (IndexError, ValueError) as e:
        return None

    try:
        linkedin_logo = results['imageUrl']
    except KeyError:
        linkedin_logo = None

    linkedin_url = results['url']

    team_size_list = re.findall(r'\d+,\d+\+|\d+-\d+', results['subLine'])
    category = re.split(';', results['subLine'])[0]

    try:
        team_size = team_size_list[0]
    except IndexError:
        team_size = None

    return team_size
    # return linkedin_logo, linkedin_url, team_size, category


def _parseTraffic(url):

    if(urlparse(url).hostname):
        domain = urlparse(url).hostname
    else:
        domain = url

    r_alexa = requests.get('http://alexa.com/siteinfo/%s' % (domain))
    alexa_html = r_alexa.text
    alexa_rank_xpath = ("//span[@class='globleRank']"
                        "/span[@data-cat='globalRank']"
                        "//strong[@class='metrics-data align-vmiddle']/text()")
    alexa_rank_result = Selector(text=alexa_html).xpath(alexa_rank_xpath).extract()[1].strip()

    alexa_top_country_xpath = ("//span[@class='countryRank']"
                               "/span[@data-cat='countryRank']"
                               "//h4[@class='metrics-title']/a/text()")
    try:
        alexa_top_country_result = Selector(text=alexa_html).xpath(alexa_top_country_xpath).extract()[0]
    except IndexError:
        alexa_top_country_result = None

    alexa_top_country_rank_xpath = ("//span[@class='countryRank']"
                                    "/span[@data-cat='countryRank']"
                                    "//strong[@class='metrics-data align-vmiddle']"
                                    "/text()")
    try:
        alexa_top_country_rank_result = Selector(text=alexa_html).xpath(alexa_top_country_rank_xpath).extract()[0].strip()
    except IndexError:
        alexa_top_country_rank_result = None

    r_sw = requests.get('https://www.similarweb.com/website/%s' % (domain))
    sw_html = r_sw.text
    sw_index = sw_html.find('"TotalLastMonthVisits"')
    sw_html = sw_html[sw_index:]
    sw_html = sw_html[:sw_html.find(',')]
    sw_visitors_raw = sw_html.replace('"', '').split(':')

    try:
        sw_visitors = sw_visitors_raw[1]
    except IndexError:
        sw_visitors = None

    return alexa_rank_result, alexa_top_country_result, alexa_top_country_rank_result, sw_visitors

    # print(alexa_rank_result)
    # print(alexa_top_country_result)
    # print(alexa_top_country_rank_result)
    # print(sw_visitors)


# Return list of django objects with Technology model
def _getTechnologies(company_url):
    technologies_raw = wappalyzer.Wappalyzer().analyze_with_categories(company_url)

    technologies = []

    for tech in technologies_raw:
        # for tech_cats in tech['categories']:
            # tech_obj, tech_created = TechnologyCategory.objects.get_or_create(name=tech_cats)

        cat_obj, cat_created = TechnologyCategory.objects.get_or_create(name=tech['categories'][0])
        tech, tech_created = Technology.objects.get_or_create(name=tech['name'], url=tech['website'], category=cat_obj)
        technologies.append(tech)

    return technologies


def _getMetaTags(company_url):

    try:
        r_website = requests.get("http://%s" % company_url)
    except requests.exceptions.RequestException:
        return None

    website_html = r_website.text

    description_xpath = ("//meta[@name='description' or @name='Description'"
                         "or @property='description' or @property='Description']/@content")
    twitter_description_xpath = ("//meta[@name='twitter:description'"
                                 "or @property='twitter:description']/@content")
    facebook_description_xpath = ("//meta[@name='og:description'"
                                  "or @property='og:description']/@content")

    description = None

    def __extractDescription(xpath):
        try:
            meta_description = Selector(text=website_html).xpath(xpath).extract()[0]
        except IndexError:
            return ''

        return meta_description

    description = __extractDescription(description_xpath)

    if not description:
        description = __extractDescription(twitter_description_xpath)
        # description = Selector(text=website_html).xpath(twitter_description_xpath).extract()

    if not description:
        description = __extractDescription(facebook_description_xpath)
        # description = Selector(text=website_html).xpath(facebook_description_xpath).extract()

    return description


def _getCompanyUrl(company_name):
    url = 'https://autocomplete.clearbit.com/v1/companies/suggest?query='
    r_company = requests.get(url + company_name)
    company_info = json.loads(r_company.text)

    if company_info and 'message' not in company_info:
        company_url = company_info[0]['domain']
        logo_url = company_info[0]['logo']
    else:
        company_url = None
        logo_url = None

    return company_url, logo_url


def _analyzeCompany(company_name, company_url, company_logo):

    company_domain = urlparse(company_url).hostname

    if not company_domain:
        company_domain = urlparse('http://%s' % company_url).hostname

    company_url = company_domain

    try:
        requests.get("http://%s" % company_url)
    except requests.exceptions.RequestException:
        print('Exception')
        return None

    description = _getMetaTags(company_url)
    location_raw, phone = _parseWhois(company_url)
    alexa_rank, top_country, top_country_rank, month_visitors = _parseTraffic(company_url)
    technologies = _getTechnologies(company_url)

    team_size = _parseLinkedin(company_name)

    if location_raw:
        location = Location(**location_raw)
        location.save()
    else:
        location = None

    if company_url:
        company_url = "http://%s" % company_url

    company = Company(name=company_name, domain=company_url,
                      description=description, location=location,
                      alexa_rank=alexa_rank, top_country=top_country,
                      top_country_rank=top_country_rank, month_visitors=month_visitors,
                      team_size=team_size)
    try:
        company.save()
    except DataError:
        return None

    if technologies:
        company.technologies.add(*technologies)

    return company


def _analyzeJob(name, company_name, text, skills, company_url=None, company_logo=None):

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

    same_company = Company.objects.filter(name=company_name)
    print('')
    try:
        print(company_name)
    except UnicodeEncodeError:
        print('unicode error — id=%s' % str(same_company.first().id))

    if same_company:
        print('same_company')
        company = same_company.first()
    else:

        if company_url is None:
            company_url, logo_url = _getCompanyUrl(company_name)

        if company_url:
            company = _analyzeCompany(company_name, company_url, company_logo)
        else:
            company = None

    if skills:
        tags, scope = analyzeTags.Tags().getTags(skills=skills)
    else:
        tags, scope = analyzeTags.Tags().getTags(text=total_text)

    """
    w_fork = wappalyzer_fork.Wappalyzer()
    apps = w_fork.analyze(url='http://example.com')
    """

    # logo_img_format = logo_url[-4:]
    # logo_img_temp = NamedTemporaryFile(delete=True)
    # logo_img_temp.write(urllib.request.urlopen(avatar_url).read())
    # logo_img_temp.flush()
    # company.logo.save(str(profile.id_profile) + str(img_format), File(img_temp))

    return salary, exp, tags, scope, company


def saveJob(date, name, company_name, text, job_url, source, skills=[], company_url=None, company_logo=None):

    same_job = Job.objects.filter(url=job_url)

    if same_job:
        print('same_job; continue')
        # print(same_job.first().name)
        # return
        # break
    else:

        salary, exp, tags, scope, company = _analyzeJob(name, company_name, text, skills, company_url, company_logo)
        # print(name)

        job = Job(date=date, name=name[:250], exp=exp, text=text,
                  salary=salary, source=source, scope=scope, url=job_url,
                  company_name=company_name[:250], company=company)

        try:
            job.save()
        except DataError:
            return

        tags.update(set(skills))
        for skill in tags:
            obj, created = Skill.objects.get_or_create(name=skill)
            job.skills.add(obj)

        keywords = nltkutils.analyze(text)

        for keyword in keywords:
            obj, created = Keyword.objects.get_or_create(name=keyword)
            job.keywords.add(obj)

        job.save()
