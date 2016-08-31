import fetch from 'isomorphic-fetch';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { browserHistory } from 'react-router'

import { getLanes, loginPopupClose } from './index.js' 

import * as types from '../constants/ActionTypes';


///////////////////////////////////
// POPUP START
///////////////////////////////////

var popupSettings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

function getPopupOffset({width, height}) {
  var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  var wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + (window.innerWidth / 2) - (width / 2);
  var top = wTop + (window.innerHeight / 2) - (height / 2);

  return {top, left};
}

function getPopupDimensions(provider) {
  let {width, height} = {width: 495, height: 645};
  let {top, left} = getPopupOffset({width, height});

  return `width=${width},height=${height},top=${top},left=${left}`;
}

function openPopup(provider, url, name) {
    return window.open(url, name, `${popupSettings},${getPopupDimensions(provider)}`)
}

///////////////////////////////////
// POPUP END
///////////////////////////////////


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function getUrlParams(location) {
    let hashes = location.slice(location.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })

    return params
}

function getUserToken (oauthToken, oauthVerifier, oauth_token_secret, resolve, reject) {


}

function listenForCredentials (endpointKey, popup, provider, oauth_token_secret, resolve, reject) {
    
    if (!resolve) {
        return new Promise((resolve, reject) => {
            listenForCredentials(endpointKey, popup, provider, oauth_token_secret, resolve, reject);
        });
    }
    else{
        let creds;

        try {
            creds = getUrlParams(popup.location.search);
        } catch (err) {}

        if (creds && creds.oauth_verifier) {
            popup.close();

            let oauthToken = creds.oauth_token
            let oauthVerifier = creds.oauth_verifier

            let body = JSON.stringify({
                "oauth_token": oauthToken,
                "oauth_verifier": oauthVerifier,
                "oauth_token_secret": oauth_token_secret
            });

            fetch('/auth/login/', {method: 'POST', headers: headers, body: body})
                .then(function(response) { 
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }

                    return response.json();
                })
                .then( function(data){
                    resolve(data['key']);
                })
                .catch(({errors}) => reject({errors}));

                /*
                .then(function(response) {
                    if (response.status >= 400) {
                        reject({errors: "Bad response from server"});
                    }
                    return response.json();
                })
                .then(function(data) {
                    console.log(data['key']);
                    return resolve(data['key']);
                });
                */


            // return getUserToken(creds.oauth_token, creds.oauth_verifier, oauth_token_secret, resolve, reject);

            /*
            persistData(C.SAVED_CREDS_KEY, normalizeTokenKeys(creds));
            fetch(getTokenValidationPath(endpointKey))
                .then(parseResponse)
                .then(({data}) => resolve(data))
                .catch(({errors}) => reject({errors}));
            */
        } else if (popup.closed) {
            reject({errors: "Authentication was cancelled"});
            // throw new Error("Authentication was cancelled");
        } else {
            setTimeout(() => {
                listenForCredentials(endpointKey, popup, provider, oauth_token_secret, resolve, reject);
            }, 0);
        }
    }

}


// function authenticate({endpointKey, provider, url, tab=false}) {
function authenticate({provider, url, tab=false}) {

    let oauthToken

    let name = (tab) ? "_blank" : provider;
    let popup = openPopup(provider, url='about:blank', name);

    return fetch('/auth/token/', {method: 'POST', headers: headers})
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();
        })
        .then(function(data) {
            let twitter_url = data['oauth_token'];

            // url = 'http://api.twitter.com/oauth/authenticate?oauth_token=' + oauthToken;

            popup.location.href = twitter_url;
            let oauth_token_secret = data['oauth_token_secret']

            let endpointKey = 'endpointKey';
            return listenForCredentials(endpointKey, popup, provider, oauth_token_secret);
        });


/*
    try{
        var heyhey = await fetch(url, {'POST', headers});
    }
    catch(e){
        alert('error');
    }

    if(res.ok){
        console.log(res);

        let name = (tab) ? "_blank" : provider;
        let popup = openPopup(provider, url, name);
    }
    else{
        console.log('not ok');
    }
*/
    
}


export function oAuthSignInComplete(key) {
    return { 
        type: types.TWITTER_LOGIN_SUCCESS,
        key
    };
}

/*
export function getUser() {
  return {
    [CALL_API]: {
        endpoint: '/dashboard/login?email=${email}&password=${password}',
        method: 'GET',
        types: [
            'types.LOGIN_REQUEST',
            'types.LOGIN_SUCCESS',
            'types.LOGIN_FAILURE'
        ]
    }
  };
}
*/

export function getUser() {
    return {
        [CALL_API]: {
            endpoint: '/auth/get-user/',
            method: 'GET',
            types: [
                types.GET_USER_REQUEST,
                {
                    type: types.GET_USER_SUCCESS,
                    payload: (action, state, res) => {
                        return getJSON(res);
                    }
                },
                types.GET_USER_FAILURE
                /*
                {
                    type: types.GET_USER_FAILURE,
                    remove: () => {
                        localStorage.removeItem('sagfi_token');
                    }
                }
                */
            ]
        }
    };
}

// export function auth ({provider, params, endpointKey}) {
export function auth () {

    return dispatch => {
        // save previous endpoint key in case of failure
            // var prevEndpointKey = getCurrentEndpointKey();

        // necessary for `fetch` to recognize the response as an api request
            // setCurrentEndpointKey(endpointKey);
            // dispatch(storeCurrentEndpointKey(endpointKey));

            // var currentEndpointKey = getCurrentEndpointKey();

            // dispatch(oAuthSignInStart(provider, currentEndpointKey));

        // let url = getOAuthUrl({provider, params, currentEndpointKey});

        let url = '/auth/token/';
        let provider = 'twitter';

        let oauthToken

        authenticate({provider, url})
            .then(function (key) {
                localStorage.setItem('sagfi_token', key);
                
                // browserHistory.push('/');

                dispatch(getUser());
                dispatch(getLanes());
                // dispatch(loginPopupClose());

                // dispatch(oAuthSignInComplete(key));
            });



      //   return authenticate({endpointKey, provider, url})
            // .then(user => dispatch(oAuthSignInComplete(user, currentEndpointKey)))
            // .catch(({ errors }) => {
            // // revert endpoint key to what it was before failed request
            // setCurrentEndpointKey(prevEndpointKey);
            // dispatch(storeCurrentEndpointKey(prevEndpointKey));
            // dispatch(oAuthSignInError(errors, currentEndpointKey))
            // throw errors;
      //     });
    };

}
