# Python
import oauth2 as oauth
import cgi
import json
import collections
import requests
from urllib import parse as urlparse

# Django
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

# Project
from .models import Profile

# DRF
from .serializers import ProfileSerializer, UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.authentication import TokenAuthentication


# It's probably a good idea to put your consumer's OAuth token and
# OAuth secret into your project's settings. 
### consumer = oauth.Consumer(settings.TWITTER_TOKEN, settings.TWITTER_SECRET)
### client = oauth.Client(consumer)

request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'

# This is the slightly different URL used to authenticate/authorize.
authenticate_url = 'https://api.twitter.com/oauth/authenticate'




from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.views import LoginView
from rest_auth.social_serializers import TwitterLoginSerializer




from django.http import HttpRequest
from rest_framework import serializers
from requests.exceptions import HTTPError
# Import is needed only if we are using social login, in which
# case the allauth.socialaccount will be declared
try:
    from allauth.socialaccount.helpers import complete_social_login
except ImportError:
    pass

from allauth.socialaccount.models import SocialToken, SocialApp


class MyTwitterSerializer(TwitterLoginSerializer):
    access_token = serializers.CharField(required=True)
    token_secret = serializers.CharField(required=True)

    def _get_request(self):
        request = self.context.get('request')
        if not isinstance(request, HttpRequest):
            request = request._request
        return request

    def get_social_login(self, adapter, app, token, response):
        """
        :param adapter: allauth.socialaccount Adapter subclass. Usually OAuthAdapter or Auth2Adapter
        :param app: `allauth.socialaccount.SocialApp` instance
        :param token: `allauth.socialaccount.SocialToken` instance
        :param response: Provider's response for OAuth1. Not used in the
        :return: :return: A populated instance of the `allauth.socialaccount.SocialLoginView` instance
        """
        request = self._get_request()
        social_login = adapter.complete_login(request, app, token, response=response)
        social_login.token = token
        return social_login

    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                'View is not defined, pass it as a context variable'
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError('Define adapter_class in view')

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        if('access_token' in attrs) and ('token_secret' in attrs):
            access_token = attrs.get('access_token')
            token_secret = attrs.get('token_secret')
        else:
            raise serializers.ValidationError('Incorrect input. access_token and token_secret are required.')

        request.session['oauth_api.twitter.com_access_token'] = {
            'oauth_token': access_token,
            'oauth_token_secret': token_secret,
        }
        token = SocialToken(token=access_token, token_secret=token_secret)
        token.app = app

        try:
            login = self.get_social_login(adapter, app, token, access_token)
            complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError('Incorrect value')

        if not login.is_existing:
            login.lookup()
            login.save(request, connect=True)
        attrs['user'] = login.account.user

        return attrs


class TwitterLogin(LoginView):
    serializer_class = MyTwitterSerializer
    adapter_class = TwitterOAuthAdapter


# /token/
class TwitterGetToken(APIView):
    def post(self, request, format=None):

        socail_app = SocialApp.objects.get(name='twitter')

        consumer = oauth.Consumer(socail_app.client_id, socail_app.secret)
        # consumer = oauth.Consumer(settings.TWITTER_TOKEN, settings.TWITTER_SECRET)
        client = oauth.Client(consumer)

        # Step 1. Get a request token from Twitter.
        resp, content = client.request(request_token_url, "GET")
        if resp['status'] != '200':
            raise Exception("Invalid response from Twitter.")

        # Step 2. Store the request token in a session for later use.
        # request.session['request_token'] = dict(cgi.parse_qsl(content))

        request_token = dict(urlparse.parse_qsl(content.decode('UTF-8')))

        # Step 3. Redirect the user to the authentication URL.
        url = "%s?oauth_token=%s" % (authenticate_url, request_token['oauth_token'])

        return Response({'oauth_token': url, 'oauth_token_secret': request_token['oauth_token_secret']})


# /login/
class TwitterGetAllTokens(APIView):
    def post(self, request, format=None):

        oauth_token = request.data['oauth_token']
        oauth_token_secret = request.data['oauth_token_secret']
        oauth_verifier = request.data['oauth_verifier']

        token = oauth.Token(oauth_token, oauth_token_secret)

        token.set_verifier(oauth_verifier)

        socail_app = SocialApp.objects.get(name='twitter')
        consumer = oauth.Consumer(socail_app.client_id, socail_app.secret)
        client = oauth.Client(consumer, token)

        resp, content = client.request(access_token_url, "POST")
        access_token = dict(urlparse.parse_qsl(content.decode('UTF-8')))

        body = {
            "access_token": access_token['oauth_token'],
            "token_secret": access_token['oauth_token_secret']
        }

        r = requests.post('http://'+request.get_host()+reverse('auth:twitter_login'), json=body)
        return Response(r.json())
        # return Response({'access_token': access_token['oauth_token_secret'], 'token_secret': access_token['oauth_token'], 'token_secret_old': oauth_token_secret})


class UserView(RetrieveAPIView):
    model = User
    serializer_class = UserSerializer

    authentication_classes = (TokenAuthentication,)

    def retrieve(self, request):
        """
        If provided 'pk' is "me" then return the current user.
        """
        # if request.user and pk == 'me':
        #    return Response(UserSerializer(request.user).data)

        return Response(UserSerializer(request.user).data)
        # return super(UserView, self).retrieve(request, pk)










@login_required
def twitter_logout(request):
    # Log a user out using Django's logout function and redirect them
    # back to the homepage.
    logout(request)
    return HttpResponseRedirect('/')


def twitter_authenticated(request):
    # Step 1. Use the request token in the session to build a new client.
    token = oauth.Token(request.session['request_token']['oauth_token'],
                        request.session['request_token']['oauth_token_secret'])
    token.set_verifier(request.GET['oauth_verifier'])
    client = oauth.Client(consumer, token)

    # Step 2. Request the authorized access token from Twitter.
    resp, content = client.request(access_token_url, "GET")
    if resp['status'] != '200':
        raise Exception("Invalid response from Twitter.")

    """
    This is what you'll get back from Twitter. Note that it includes the
    user's user_id and screen_name.
    {
        'oauth_token_secret': 'IcJXPiJh8be3BjDWW50uCY31chyhsMHEhqJVsphC3M',
        'user_id': '120889797', 
        'oauth_token': '120889797-H5zNnM3qE0iFoTTpNEHIz3noL9FKzXiOxwtnyVOD',
        'screen_name': 'heyismysiteup'
    }
    """
    access_token = dict(cgi.parse_qsl(content))

    # Step 3. Lookup the user or create them if they don't exist.
    try:
        user = User.objects.get(username=access_token['screen_name'])
    except User.DoesNotExist:
        # When creating the user I just use their screen_name@twitter.com
        # for their email and the oauth_token_secret for their password.
        # These two things will likely never be used. Alternatively, you 
        # can prompt them for their email here. Either way, the password 
        # should never be used.
        user = User.objects.create_user(access_token['screen_name'],
            '%s@twitter.com' % access_token['screen_name'],
            access_token['oauth_token_secret'])

        # Save our permanent token and secret for later.
        profile = Profile()
        profile.user = user
        profile.oauth_token = access_token['oauth_token']
        profile.oauth_secret = access_token['oauth_token_secret']
        profile.save()

    # Authenticate the user and log them in using Django's pre-built 
    # functions for these things.
    user = authenticate(username=access_token['screen_name'],
                        password=access_token['oauth_token_secret'])
    login(request, user)

    return HttpResponseRedirect('/')