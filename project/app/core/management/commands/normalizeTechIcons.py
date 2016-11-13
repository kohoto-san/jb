
# from django.core.management.base import NoArgsCommand
from django.core.management.base import BaseCommand, BaseCommand
from app.core.models import Technology

import os
import json


class Command(BaseCommand):
    help = 'Normalize icons in technologies'

    # def handle_noargs(self, **options):
    def handle(self, *args, **options):

        techs = Technology.objects.all()

        BASE_DIR = os.path.abspath('.')
        path = os.path.join(BASE_DIR, 'app/jobparser/data/apps.json')

        print(path)

        try:
            with open(path, 'r') as fd:
                obj = json.load(fd)
        except IOError as e:
            print("Error opening apps.json: %s" % e)
            return

        apps = obj['apps']

        for tech in techs:
            icon = apps[tech.name]["icon"]
            tech.icon = icon

            print(icon)
            tech.save()
