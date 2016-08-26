webpackHotUpdate(0,{

/***/ 497:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.oAuthSignInComplete = oAuthSignInComplete;
	exports.getUser = getUser;
	exports.auth = auth;

	var _isomorphicFetch = __webpack_require__(349);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _reduxApiMiddleware = __webpack_require__(260);

	var _ActionTypes = __webpack_require__(498);

	var types = _interopRequireWildcard(_ActionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	///////////////////////////////////
	// POPUP START
	///////////////////////////////////

	var popupSettings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

	function getPopupOffset(_ref) {
	    var width = _ref.width;
	    var height = _ref.height;

	    var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	    var wTop = window.screenTop ? window.screenTop : window.screenY;

	    var left = wLeft + window.innerWidth / 2 - width / 2;
	    var top = wTop + window.innerHeight / 2 - height / 2;

	    return { top: top, left: left };
	}

	function getPopupDimensions(provider) {
	    var _width$height = { width: 495, height: 645 };
	    var width = _width$height.width;
	    var height = _width$height.height;

	    var _getPopupOffset = getPopupOffset({ width: width, height: height });

	    var top = _getPopupOffset.top;
	    var left = _getPopupOffset.left;


	    return 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
	}

	function openPopup(provider, url, name) {
	    return window.open(url, name, popupSettings + ',' + getPopupDimensions(provider));
	}

	///////////////////////////////////
	// POPUP END
	///////////////////////////////////


	var headers = {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	};

	function getUrlParams(location) {
	    var hashes = location.slice(location.indexOf('?') + 1).split('&');
	    var params = {};
	    hashes.map(function (hash) {
	        var _hash$split = hash.split('=');

	        var _hash$split2 = _slicedToArray(_hash$split, 2);

	        var key = _hash$split2[0];
	        var val = _hash$split2[1];

	        params[key] = decodeURIComponent(val);
	    });

	    return params;
	}

	function getUserToken(oauthToken, oauthVerifier, oauth_token_secret, resolve, reject) {}

	function listenForCredentials(endpointKey, popup, provider, oauth_token_secret, resolve, reject) {

	    if (!resolve) {
	        return new Promise(function (resolve, reject) {
	            listenForCredentials(endpointKey, popup, provider, oauth_token_secret, resolve, reject);
	        });
	    } else {
	        var creds = void 0;

	        try {
	            creds = getUrlParams(popup.location.search);
	        } catch (err) {}

	        if (creds && creds.oauth_verifier) {
	            popup.close();

	            var oauthToken = creds.oauth_token;
	            var oauthVerifier = creds.oauth_verifier;

	            var body = JSON.stringify({
	                "oauth_token": oauthToken,
	                "oauth_verifier": oauthVerifier,
	                "oauth_token_secret": oauth_token_secret
	            });

	            (0, _isomorphicFetch2.default)('/auth/login/', { method: 'POST', headers: headers, body: body }).then(function (response) {
	                if (response.status >= 400) {
	                    throw new Error("Bad response from server");
	                }

	                return response.json();
	            }).then(function (data) {
	                resolve(data['key']);
	            }).catch(function (_ref2) {
	                var errors = _ref2.errors;
	                return reject({ errors: errors });
	            });

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
	            reject({ errors: "Authentication was cancelled" });
	            // throw new Error("Authentication was cancelled");
	        } else {
	            setTimeout(function () {
	                listenForCredentials(endpointKey, popup, provider, oauth_token_secret, resolve, reject);
	            }, 0);
	        }
	    }
	}

	// function authenticate({endpointKey, provider, url, tab=false}) {
	function authenticate(_ref3) {
	    var provider = _ref3.provider;
	    var url = _ref3.url;
	    var _ref3$tab = _ref3.tab;
	    var tab = _ref3$tab === undefined ? false : _ref3$tab;


	    var oauthToken = void 0;

	    var name = tab ? "_blank" : provider;
	    var popup = openPopup(provider, url = 'about:blank', name);

	    return (0, _isomorphicFetch2.default)('/auth/token/', { method: 'POST', headers: headers }).then(function (response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }

	        return response.json();
	    }).then(function (data) {
	        var twitter_url = data['oauth_token'];

	        // url = 'http://api.twitter.com/oauth/authenticate?oauth_token=' + oauthToken;

	        popup.location.href = twitter_url;
	        var oauth_token_secret = data['oauth_token_secret'];

	        var endpointKey = 'endpointKey';
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

	function oAuthSignInComplete(key) {
	    return {
	        type: types.TWITTER_LOGIN_SUCCESS,
	        key: key
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

	function getUser() {
	    return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
	        endpoint: '/auth/get-user/',
	        method: 'GET',
	        types: [types.GET_USER_REQUEST, {
	            type: types.GET_USER_SUCCESS,
	            payload: function payload(action, state, res) {
	                return (0, _reduxApiMiddleware.getJSON)(res);
	            }
	        }, types.GET_USER_FAILURE
	        /*
	        {
	            type: types.GET_USER_FAILURE,
	            remove: () => {
	                localStorage.removeItem('sagfi_token');
	            }
	        }
	        */
	        ]
	    });
	}

	// export function auth ({provider, params, endpointKey}) {
	function auth() {

	    return function (dispatch) {
	        // save previous endpoint key in case of failure
	        // var prevEndpointKey = getCurrentEndpointKey();

	        // necessary for `fetch` to recognize the response as an api request
	        // setCurrentEndpointKey(endpointKey);
	        // dispatch(storeCurrentEndpointKey(endpointKey));

	        // var currentEndpointKey = getCurrentEndpointKey();

	        // dispatch(oAuthSignInStart(provider, currentEndpointKey));

	        // let url = getOAuthUrl({provider, params, currentEndpointKey});

	        var url = '/auth/token/';
	        var provider = 'twitter';

	        var oauthToken = void 0;

	        authenticate({ provider: provider, url: url }).then(function (key) {
	            localStorage.setItem('sagfi_token', key);
	            dispatch(getUser());
	            dispatch(getLanes());

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

/***/ }

})