webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _style = __webpack_require__(2);

	var _style2 = _interopRequireDefault(_style);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(37);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _redux = __webpack_require__(177);

	var _reactRedux = __webpack_require__(191);

	var _reactRouter = __webpack_require__(192);

	var _reactRouterRedux = __webpack_require__(255);

	var _reduxApiMiddleware = __webpack_require__(260);

	var _components2 = __webpack_require__(351);

	var _jobs = __webpack_require__(505);

	var _jobs2 = __webpack_require__(507);

	var _jobs3 = _interopRequireDefault(_jobs2);

	var _pipeline = __webpack_require__(508);

	var _jobDetails = __webpack_require__(583);

	var _jobDetails2 = _interopRequireDefault(_jobDetails);

	var _index = __webpack_require__(496);

	var _configureStore = __webpack_require__(585);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Create an enhanced history that syncs navigation events with the store


	// import reducers from './reducers'
	// import * as reducers from './reducers'

	var token = localStorage.getItem('sagfi_token') || null;


	var parsedData = undefined;
	if (!token) {
	    var data_local = localStorage.getItem('sagfi_data');
	    if (JSON.parse(data_local)) {
	        parsedData = JSON.parse(data_local);
	    }
	}

	// const store = configureStore(parsedData);
	var store = (0, _configureStore2.default)(undefined);
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

	function handleChange() {

	    if (!token) {
	        var entities = store.getState()['entities'];
	        var data = { entities: entities };
	        var stringData = JSON.stringify(data);

	        localStorage.setItem('sagfi_data', stringData);
	        // console.log('handleChange')
	        // console.log(stringData)
	    }

	    // let previousValue = currentValue
	    // currentValue = select(store.getState())

	    // if (previousValue !== currentValue) {
	    //     console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
	    // }
	}

	var unsubscribe = store.subscribe(handleChange);

	/*
	store.dispatch( addLane('Like') )
	store.dispatch( addLane('Interview') )
	store.dispatch( addLane('Offer') )

	store.dispatch( addJob({ name: 'Fuck fuck 111', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
	store.dispatch( addJob({ name: 'Fuck fuck 222', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
	store.dispatch( addJob({ name: 'Fuck fuck 333', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
	store.dispatch( addJob({ name: 'Fuck fuck 444', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))

	const laneId = 0

	store.dispatch( attachToLane(laneId, 11) )
	store.dispatch( attachToLane(laneId, 12) )
	store.dispatch( attachToLane(laneId, 13) )
	store.dispatch( attachToLane(laneId, 13) )

	store.dispatch( attachToLane(1, 14) )
	*/

	// console.log(store.getState())

	var userAuth = function userAuth(nextState, replace, callback) {

	    if (token) {
	        store.dispatch((0, _index.getUser)());
	        store.dispatch((0, _index.getLanes)());
	    }

	    callback();
	};

	_reactDom2.default.render(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(
	        _reactRouter.Router,
	        { history: history },
	        _react2.default.createElement(
	            _reactRouter.Route,
	            { path: '/', component: _components2.App, onEnter: userAuth },
	            _react2.default.createElement(_reactRouter.IndexRoute, { component: _jobs3.default }),
	            _react2.default.createElement(_reactRouter.Route, { path: 'my-jobs', component: _pipeline.VisiblePipeline }),
	            _react2.default.createElement(_reactRouter.Route, { path: 'job/:slug', component: _jobDetails2.default })
	        )
	    )
	), document.getElementById('app'));

/***/ }
])