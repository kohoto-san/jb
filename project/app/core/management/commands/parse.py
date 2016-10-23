# from django.core.management.base import NoArgsCommand
from django.core.management.base import BaseCommand, BaseCommand
# from app.core import parseJobs
from app.jobparser import parseJobsManager


class Command(BaseCommand):
    help = 'Parse jobs from job boards'

    # def handle_noargs(self, **options):
    def handle(self, *args, **options):
        parseJobsManager.parseJobsManager()
