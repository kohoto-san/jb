from django.contrib import admin
from .models import Skill, Keyword, Job, Lane, MetaJob

admin.site.register(Skill)
admin.site.register(Keyword)
admin.site.register(Lane)
admin.site.register(MetaJob)


# admin.site.register(Job)
class JobAdmin(admin.ModelAdmin):
    ordering = ('-id',)
    # list_filter = ['id', 'date']
    # fields = ['pub_date', 'question_text']

admin.site.register(Job, JobAdmin)
