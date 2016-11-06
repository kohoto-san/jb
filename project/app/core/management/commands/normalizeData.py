
# from django.core.management.base import NoArgsCommand
from django.core.management.base import BaseCommand, BaseCommand
# from app.core import parseJobs
from app.jobparser import parseJobsManager
from app.core.models import Company


class Command(BaseCommand):
    help = 'Normalize data in companies'

    # def handle_noargs(self, **options):
    def handle(self, *args, **options):
        companies = Company.objects.all()
        chars = "[']"

        for company in companies:
            month_visitors_raw = company.month_visitors
            month_visitors = None
            if month_visitors_raw:
                for char in chars:
                    month_visitors_raw = month_visitors_raw.replace(char, '')

                month_visitors_list = month_visitors_raw.split(',')

                try:
                    month_visitors = month_visitors_list[1].strip()
                except IndexError:
                    month_visitors = None

                if not month_visitors:
                    month_visitors = None

            team_size_raw = company.team_size
            if team_size_raw:
                for char in chars:
                    team_size_raw = team_size_raw.replace(char, '')

            print(month_visitors)

            company.month_visitors = month_visitors
            company.team_size = team_size_raw
            company.save()
