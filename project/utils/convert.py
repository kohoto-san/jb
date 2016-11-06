import json


class Tags(object):

    def __init__(self):
        # super(Tags, self).__init__()

        self.load_json()

    def load_json(self):
        data_file = open('data.txt', 'r')
        data = json.load(data_file)

        result = ''

        for item in data:
            names = ', '.join(item['names'])

            result += '{\n'
            result += '\t"scopes": {" ": " "}, \n'
            result += '\t"names": [' + names + ']\n'
            result += '}, \n'

        with open('form_result.txt', 'w') as outfile:
            outfile.write(result)
            outfile.close()
            print('fuck yeah')

Tags()
