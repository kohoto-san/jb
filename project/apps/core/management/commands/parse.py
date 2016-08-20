from django.core.management.base import NoArgsCommand
from apps.core import parseJobs


class Command(NoArgsCommand):
    def handle_noargs(self, **options):
        parseJobs.parseJobs()
