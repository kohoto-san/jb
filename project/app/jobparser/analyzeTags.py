import json


class Tags(object):

    def __init__(self):

        try:
            with open('app/jobparser/data/tags.json', 'r') as fd:
                self.list_tags = json.load(fd)
        except IOError as e:
            print("Error opening tags.json: %s" % e)

        self.job_scopes = {}
        self.job_techs = []

        scopes = ["Web/Frontend", "Web/Backend", "Web/FullStack", "Mobile/CrossPlatform", "Mobile/iOS", "Mobile/Android"]

        for key in scopes:
            self.job_scopes[key] = 0

    def getTags(self, text=None, skills=None):

        if text:
            formating_text = text.lower()

        for tech in self.list_tags:
            for tech_name in tech['names']:
                if (skills and tech_name in skills) or (text and tech_name in formating_text):

                    meta_job_techs = {"name": tech['names'][0], "scopes": tech["scopes"]}
                    self.job_techs.append(meta_job_techs)

                    for scope in tech['scopes']:
                        self.job_scopes[scope] += 1

        result_scope = max(self.job_scopes, key=self.job_scopes.get)

        result_tags = set()

        for techs in self.job_techs:
            if result_scope in techs["scopes"]:
                result_tags.add(techs["name"])

        return result_tags, result_scope
