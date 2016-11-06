# https://github.com/chorsley/python-Wappalyzer/blob/master/Wappalyzer/Wappalyzer.py

import json
import re
import warnings
import os
import logging
from urllib.parse import urlparse

import requests

# from BeautifulSoup import BeautifulSoup
from bs4 import BeautifulSoup
from scrapy.selector import Selector
import dns.resolver

import signal
from contextlib import contextmanager

logger = logging.getLogger(name=__name__)


class TimeoutException(Exception):
    pass


class WebPage(object):
    """
    Simple representation of a web page, decoupled
    from any particular HTTP library's API.
    """

    def __init__(self, url, html, headers):
        """
        Initialize a new WebPage object.

        Parameters
        ----------

        url : str
            The web page URL.
        html : str
            The web page content (HTML)
        headers : dict
            The HTTP response headers
        """
        self.url = url
        self.html = html
        self.headers = headers

        try:
            self.headers.keys()
        except AttributeError:
            raise ValueError("Headers must be a dictionary-like object")

        self._parse_html()
        # self._parse_dns()

    def _parse_html(self):
        """
        Parse the HTML with BeautifulSoup to find <script> and <meta> tags.
        """
        self.parsed_html = soup = BeautifulSoup(self.html, 'lxml')
        # self.scripts = [script['src'] for script in
        #                soup.find_all('script', src=True)]
        self.scripts = Selector(text=self.html).xpath('//script').extract()

        self.meta = {
            meta['name'].lower():
                meta['content'] for meta in soup.find_all(
                    'meta', attrs=dict(name=True, content=True))
        }

    def _parse_dns(self):
        dns_url = urlparse(self.url).netloc.replace('www.', '')

        total_spf = set()

        def __parse_spf(dns_records):
            for dns_record_raw in dns_records:

                # dns_record = dns_record_raw.strings[0].decode('utf-8')
                dns_record = dns_record_raw.to_text()

                if 'include:' in dns_record:
                    spf_raw = dns_record[dns_record.find('include:'):dns_record.rfind(' ~all')]
                    spf_list = [s.strip() for s in spf_raw.split('include:') if s]
                    total_spf.update(set(spf_list))

        try:
            mx_records_dns = dns.resolver.query(dns_url, 'MX')
        except dns.resolver.NoAnswer:
            mx_records_dns = None

        mx_records = []

        if mx_records_dns:
            mx_records = [record.to_text() for record in mx_records_dns]

        self.mx_records = mx_records

        try:
            spf_records_dns = dns.resolver.query(dns_url, 'SPF')
            __parse_spf(spf_records_dns)
        except dns.resolver.NoAnswer:
            spf_records_dns = None

        try:
            txt_records_dns = dns.resolver.query(dns_url, 'TXT')
            __parse_spf(txt_records_dns)
        except dns.resolver.NoAnswer:
            txt_records_dns = None

        self.spf_records = total_spf

    @classmethod
    def new_from_url(cls, url, verify=True):
        """
        Constructs a new WebPage object for the URL,
        using the `requests` module to fetch the HTML.

        Parameters
        ----------

        url : str
        verify: bool
        """
        try:
            response = requests.get(url, verify=verify, timeout=5)
        except requests.exceptions.ReadTimeout:
            pass

        return cls(response.url, html=response.text, headers=response.headers)
        # return cls.new_from_response(response)

    # @classmethod
    # def new_from_response(cls, response):
        """
        Constructs a new WebPage object for the response,
        using the `BeautifulSoup` module to parse the HTML.

        Parameters
        ----------

        response : requests.Response object
        """
        # return cls(response.url, html=response.text, headers=response.headers)


class Wappalyzer(object):
    """
    Python Wappalyzer driver.
    """
    def __init__(self):
        """
        Initialize a new Wappalyzer instance.

        Parameters
        ----------

        categories : dict
            Map of category ids to names, as in apps.json.
        apps : dict
            Map of app names to app dicts, as in apps.json.
        """
        # self.categories = categories
        # self.apps = apps

        CURRENT_DIR = os.path.abspath('.')
        path = os.path.abspath(os.path.join(CURRENT_DIR, 'app/jobparser/data/apps.json'))
        print(path)

        try:
            with open(path, 'r') as fd:
                obj = json.load(fd)
        except IOError as e:
            print("Error opening apps.json: %s" % e)
            return

        self.categories = obj['categories']
        self.apps = obj['apps']

        for name, app in self.apps.items():
            self._prepare_app(app)

    # @classmethod
    # def latest(cls):
        """
        Construct a Wappalyzer instance using a apps db path passed in via
        apps_file, or alternatively the default in data/apps.json
        """
        # with open('app/jobparser/apps.json', 'r') as fd:
        #    obj = json.load(fd)

        # return cls(categories=obj['categories'], apps=obj['apps'])

    def _prepare_app(self, app):
        """
        Normalize app data, preparing it for the detection phase.
        """

        # Ensure these keys' values are lists
        for key in ['url', 'html', 'script', 'implies']:
            try:
                value = app[key]
            except KeyError:
                app[key] = []
            else:
                if not isinstance(value, list):
                    app[key] = [value]

        # Ensure these keys exist
        for key in ['headers', 'meta']:
            try:
                value = app[key]
            except KeyError:
                app[key] = {}

        # Ensure the 'meta' key is a dict
        obj = app['meta']
        if not isinstance(obj, dict):
            app['meta'] = {'generator': obj}

        # Ensure keys are lowercase
        for key in ['headers', 'meta']:
            obj = app[key]
            app[key] = {k.lower(): v for k, v in obj.items()}

        # Prepare regular expression patterns
        for key in ['url', 'html', 'script']:
            app[key] = [self._prepare_pattern(pattern) for pattern in app[key]]

        for key in ['headers', 'meta']:
            obj = app[key]
            for name, pattern in obj.items():
                obj[name] = self._prepare_pattern(obj[name])

    def _prepare_pattern(self, pattern):
        """
        Strip out key:value pairs from the pattern and compile the regular
        expression.
        """
        regex, _, rest = pattern.partition('\\;')
        try:
            return re.compile(regex, re.I)
        except re.error as e:
            warnings.warn(
                "Caught '{error}' compiling regex: {regex}"
                .format(error=e, regex=regex)
            )
            # regex that never matches:
            # http://stackoverflow.com/a/1845097/413622
            return re.compile(r'(?!x)x')

    def _has_app(self, app, webpage):
        """
        Determine whether the web page matches the app signature.
        """
        # Search the easiest things first and save the full-text search of the
        # HTML for last

        @contextmanager
        def time_limit(seconds):
            def signal_handler(signum, frame):
                raise TimeoutException()
            signal.signal(signal.SIGALRM, signal_handler)
            signal.alarm(seconds)
            try:
                yield
            finally:
                signal.alarm(0)

        for regex in app['url']:
            if regex.search(webpage.url):
                return True

        for name, regex in app['headers'].items():
            if name in webpage.headers:
                content = webpage.headers[name]
                if regex.search(content):
                    return True

        for regex in app['script']:
            for script in webpage.scripts:
                try:
                    with time_limit(5):
                        if regex.search(script):
                            return True
                except TimeoutException:
                    print("Timed out!")

        for name, regex in app['meta'].items():
            if name in webpage.meta:
                content = webpage.meta[name]
                if regex.search(content):
                    return True

        for regex in app['html']:
            if regex.search(webpage.html):
                return True

    def _get_implied_apps(self, detected_apps):
        """
        Get the set of apps implied by `detected_apps`.
        """

        def __get_implied_apps(apps):
            _implied_apps = set()
            for app in apps:
                try:
                    _implies_raw = self.apps[app]['implies']
                    # check app[implies] for has '\\confidence:50'
                    if isinstance(_implies_raw, list):
                        _implies_str = [i.split('\\')[0] for i in _implies_raw]
                    else:
                        _implies_str = _implies_raw.split('\\')[0]

                    _implied_apps.update(set(_implies_str))
                except KeyError:
                    pass
            return _implied_apps

        implied_apps = __get_implied_apps(detected_apps)
        all_implied_apps = set()

        # Descend recursively until we've found all implied apps
        while not all_implied_apps.issuperset(implied_apps):
            all_implied_apps.update(implied_apps)
            implied_apps = __get_implied_apps(all_implied_apps)

        return all_implied_apps

    def get_categories(self, app_name):
        """
        Returns a list of the categories for an app name.
        """

        app = self.apps.get(app_name, {})
        cat_nums = app.get("cats", [])
        cat_names = [self.categories.get("%s" % cat_num, "")
                     for cat_num in cat_nums]

        website = app.get("website", "")
        icon = app.get("icon", "")

        return cat_names, website, icon

    def analyze(self, url):
        """
        Return a list of applications that can be detected on the web page.
        """
        detected_apps = set()

        webpage = WebPage.new_from_url('http://%s' % url)

        for app_name, app in self.apps.items():
            if self._has_app(app, webpage):
                # meta_app = {"name": app_name, "website": app['website'], "icon": app['icon']}
                detected_apps.add(app_name)

        detected_apps |= self._get_implied_apps(detected_apps)

        return detected_apps

    def analyze_with_categories(self, url):

        detected_apps = self.analyze(url)

        categorised_apps = []

        for app_name in detected_apps:
            cat_names, website, icon = self.get_categories(app_name)
            meta_app = {"name": app_name, "categories": cat_names, "website": website, "icon": icon}
            categorised_apps.append(meta_app)

        # categorised_apps = {}

        # for app_name in detected_apps:
        #     cat_names = self.get_categories(app_name)
        #     categorised_apps[app_name] = {"categories": cat_names}

        return categorised_apps
