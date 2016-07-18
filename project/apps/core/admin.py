from django.contrib import admin
from apps.core.models import Skill, Keyword, Job, Lane, MetaJob

admin.site.register(Skill)
admin.site.register(Keyword)
admin.site.register(Job)
admin.site.register(Lane)
admin.site.register(MetaJob)
