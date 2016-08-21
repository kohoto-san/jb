"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, patterns
from django.contrib import admin

from apps.core import views
from apps import profiles

from django.views.generic import TemplateView


# url(r'^.*', views.home, name='home'),
urlpatterns = [
    # url(r'^$', TemplateView.as_view(template_name='index.html')),
    # url(r'^.*', TemplateView.as_view(template_name='index.html')),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),

    # url(r'^api/get-lanes/$', views.MetaJobList.as_view()),
    # url(r'^jobs/$', views.JobList.as_view()),

    # url(r'^api/job/(?P<pk>[0-9]+)$', views.JobDetails.as_view()),


    # url(r'^api/login/', include('rest_social_auth.urls_token')),
    url(r'^auth/', include('apps.profiles.urls', namespace='auth')),





    # url(r'^parse/$', views.parseJobsView, name='parse'),
]

urlpatterns += [
    url(r'', TemplateView.as_view(template_name='index.html')),
]
