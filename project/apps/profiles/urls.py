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

from apps.profiles import views


urlpatterns = [
    # url(r'^$',  views.parseJobs, name='parse'),
    url(r'^token/$', views.TwitterGetToken.as_view()),
    url(r'^login/$', views.TwitterGetAllTokens.as_view()),

    # url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest/twitter/$', views.TwitterLogin.as_view(), name='twitter_login'),

    url(r'^get-user/$', views.UserView.as_view()),

    # url(r'^parse/$', views.parseJobs, name='parse'),
]
