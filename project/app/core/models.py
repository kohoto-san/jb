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

"""
class WebsiteTag(models.Model):

    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "CompanyTag"
        verbose_name_plural = "CompanyTags"

    def __str__(self):
        return self.name
"""


class TechnologyCategory(models.Model):

    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "TechnologyCategory"
        verbose_name_plural = "TechnologysCategories"

    def __str__(self):
        return self.name


class Technology(models.Model):

    name = models.CharField(max_length=250)
    url = models.CharField(max_length=250)
    category = models.ForeignKey(TechnologyCategory)

    # description = models.CharField(max_length=250)
    # scope = models.CharField(max_length=250)            # Web/Frontend; Mobile/iOS

    class Meta:
        verbose_name = "Technology"
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name

"""
class SocProfile(models.Model):

    soc_name = models.CharField(max_length=250)

    # twitter, facebook, linkedin, github, blog, rss_url

    profile_url = models.CharField(max_length=250)
    profile_description = models.CharField(max_length=250)

    class Meta:
        verbose_name = "SocProfile"
        verbose_name_plural = "SocProfiles"

    def __str__(self):
        pass
"""


class Location(models.Model):

    full_location = models.CharField(max_length=250)
    country = models.CharField(max_length=250, blank=True, null=True)
    city = models.CharField(max_length=250, blank=True, null=True)
    street = models.CharField(max_length=250, blank=True, null=True)
    zip_code = models.CharField(max_length=250, blank=True, null=True)
    state_abbreviation = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        verbose_name = "Location"
        verbose_name_plural = "Locations"

    def __str__(self):
        return self.full_location


class Company(models.Model):

    name = models.CharField(max_length=250)
    domain = models.URLField()
    description = models.CharField(max_length=250, blank=True, null=True)
    date_founded = models.DateField(blank=True, null=True)
    # location = models.CharField(max_length=250, blank=True, null=True)
    location = models.ForeignKey(Location, blank=True, null=True)

    alexa_rank = models.CharField(max_length=250, blank=True, null=True)
    top_country = models.CharField(max_length=250, blank=True, null=True)
    top_country_rank = models.CharField(max_length=250, blank=True, null=True)
    month_visitors = models.CharField(max_length=250, blank=True, null=True)
    team_size = models.CharField(max_length=250, blank=True, null=True)

    technologies = models.ManyToManyField(Technology)

    # tags = models.ManyToManyField(WebsiteTag)

    # twitter_username
    # number_tweets
    # number_following
    # number_followers
    # twitter_description

    # facebook

    def get_upload_path(instance, filename):
        return os.path.join('logos', str(instance.id) + filename[-4:])

    # logo = models.ImageField(upload_to=get_upload_path, default="default.png", blank=True, null=True)

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.name


class Job(models.Model):

    company_name = models.CharField(max_length=250)
    company = models.ForeignKey(Company, blank=True, null=True)

    scope = models.CharField(max_length=250, blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=250)
    salary = models.CharField(max_length=250, blank=True, null=True)
    exp = models.CharField(max_length=250, blank=True, null=True)
    text = models.TextField()
    url = models.URLField()
    source = models.CharField(max_length=250)

    skills = models.ManyToManyField(Skill)
    keywords = models.ManyToManyField(Keyword)

    slug = models.SlugField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        super(Job, self).save(*args, **kwargs)
        if not self.slug:
            new_slug = "%s-%s" % (self.pk, slugify(self.name))
            if len(new_slug) > 250:
                new_slug = new_slug[:250]
            self.slug = new_slug
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
        return self.job.name + ' —— by ' + self.lane.user.username


@receiver(user_signed_up, dispatch_uid="some.unique.string.id.for.allauth.user_signed_up")
def user_signed_up_(request, user, **kwargs):
    Lane.objects.create(name='Liked', user=user)
    Lane.objects.create(name='Applied', user=user)
    Lane.objects.create(name='Interviewed', user=user)
    Lane.objects.create(name='Disqualified', user=user)
    Lane.objects.create(name='Hired', user=user)
