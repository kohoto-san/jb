from django.db import models


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

    date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250)
    company = models.CharField(max_length=250)
    salary = models.CharField(max_length=250)
    exp = models.CharField(max_length=250)
    text = models.TextField()

    skills = models.ManyToManyField(Skill)
    keywords = models.ManyToManyField(Keyword)

    class Meta:
        verbose_name = "Job"
        verbose_name_plural = "Jobs"
        ordering = ('date',)

    def __str__(self):
        return self.name


class Lane(models.Model):

    # user = models.ForeignKey()

    name = models.CharField(max_length=250)

    class Meta:
        verbose_name = "Lane"
        verbose_name_plural = "Lanes"

    def __str__(self):
        return self.name


class MetaJob(models.Model):

    # user = models.ForeignKey()

    job = models.ForeignKey(Job)
    lane = models.ForeignKey(Lane)
    position = models.IntegerField()

    class Meta:
        verbose_name = "MetaJob"
        verbose_name_plural = "MetaJobs"

    def __str__(self):
        return self.job.name
