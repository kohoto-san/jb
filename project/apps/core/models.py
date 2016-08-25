from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver
from django.utils.text import slugify

from allauth.account.signals import user_signed_up


class Skill(models.Model):

    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name


class Keyword(models.Model):

    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "Keyword"
        verbose_name_plural = "Keywords"

    def __str__(self):
        return self.name


class Job(models.Model):

    date = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=250)
    company = models.CharField(max_length=250)
    salary = models.CharField(max_length=250, blank=True, null=True)
    exp = models.CharField(max_length=250, blank=True, null=True)
    text = models.TextField()
    url = models.URLField(max_length=250)
    source = models.CharField(max_length=250)

    skills = models.ManyToManyField(Skill)
    keywords = models.ManyToManyField(Keyword)

    slug = models.SlugField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        super(Job, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = "%s-%s" % (self.pk, slugify(self.name))
            if len(self.slug) > 250:
                self.slug = self.slug[:250]
            self.save()

    class Meta:
        verbose_name = "Job"
        verbose_name_plural = "Jobs"
        ordering = ('date',)

    def __str__(self):
        return self.name


class Lane(models.Model):

    user = models.ForeignKey(User)
    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "Lane"
        verbose_name_plural = "Lanes"

    def __str__(self):
        return self.name


class MetaJob(models.Model):

    # user = models.ForeignKey()

    meta_type = models.CharField(default='like', max_length=250)
    date = models.DateField(default=timezone.now)
    job = models.ForeignKey(Job)
    lane = models.ForeignKey(Lane)
    position = models.IntegerField()

    class Meta:
        verbose_name = "MetaJob"
        verbose_name_plural = "MetaJobs"

    def __str__(self):
        return self.job.name


@receiver(user_signed_up, dispatch_uid="some.unique.string.id.for.allauth.user_signed_up")
def user_signed_up_(request, user, **kwargs):
    Lane.objects.create(name='Liked', user=user)
    Lane.objects.create(name='Applied', user=user)
    Lane.objects.create(name='Interviewed', user=user)
    Lane.objects.create(name='Disqualified', user=user)
    Lane.objects.create(name='Hired', user=user)
