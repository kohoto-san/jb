from django.test import TestCase, Client, LiveServerTestCase
from splinter import Browser


class OAuthLoginTests(LiveServerTestCase):

    def setUp(self):
        # Every test needs a client.
        # self.client = Client(Accept='application/json', Content_Type='application/json')
        self.browser = Browser('django')

    def test_get_oauth_token(self):

        url = '/api/login/social/token_user/twitter/'
        print('hyi sasi')

        response = self.client.post(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual('oauth_token' in response.json(), True)

        oauth_token = response.json()['oauth_token']
        twitter_url = 'https://api.twitter.com/oauth/authenticate?oauth_token=%s' % (oauth_token)

        twitter_respone = self.client.get(twitter_url)
        print(twitter_url)
        print(twitter_respone)

'''
class OAuthLoginTests(TestCase):

    def setUp(self):
        # Every test needs a client.
        self.client = Client(Accept='application/json', Content_Type='application/json')

    def test_get_oauth_token(self):

        url = '/api/login/social/token_user/twitter/'
        print('hyi sasi')

        response = self.client.post(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual('oauth_token' in response.json(), True)

        oauth_token = response.json()['oauth_token']
        twitter_url = 'https://api.twitter.com/oauth/authenticate?oauth_token=%s' % (oauth_token)

        twitter_respone = self.client.get(twitter_url)
        print(twitter_url)
        print(twitter_respone)


        # self.assertContains(response, "No polls are available.")
        # self.assertQuerysetEqual(response.context['latest_question_list'], [])
'''
