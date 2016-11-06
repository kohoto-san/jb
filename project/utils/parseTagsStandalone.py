import requests
import json


class Tags(object):

    def __init__(self):
        # super(Tags, self).__init__()
        self.page = 467
        self.global_result = []
        self.has_more = True

        self.get_tags()

    def write_file(self):
        print('eptaaaa')
        print(self.page)
        print('eptaaaa END')
        with open('data_new_467.txt', 'w') as outfile:
            json.dump(self.global_result, outfile)

    def get_tags(self):

        print(self.page)
        # if self.page == 468:

        if self.has_more:

            url = 'https://api.stackexchange.com/2.2/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow&filter=!-.BKquPbsXzG'
            r_so = requests.get(url + '&page=' + str(self.page))
            items = json.loads(r_so.text)

            try:
                self.has_more = items['has_more']
            except KeyError:
                write_file()

            self.parse_items(items['items'])
        else:
            self.write_file()

    def parse_items(self, items):

        result = []

        last_item = len(items) - 1

        for index, item in enumerate(items):

            result_item_names = []
            result_item_names.append(item['name'])

            try:
                result_item_names.extend(item['synonyms'])
            except KeyError:
                pass

            tag = {"scopes": {}, "names": []}
            tag['names'] = result_item_names
            result.append(tag)

            if index == last_item:
                self.global_result.extend(result)
                self.page += 1
                self.get_tags()

Tags()
