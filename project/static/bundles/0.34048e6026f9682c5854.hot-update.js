webpackHotUpdate(0,{

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getLanes = exports.move = exports.hover = exports.attachToLane = exports.addLane = exports.dislikeJob = exports.likeJob = exports.addJob = exports.getUser = exports.auth = exports.loginPopup = exports.init = undefined;

	var _auth = __webpack_require__(497);

	var _jobs = __webpack_require__(499);

	var Actions = { auth: _auth.auth, getUser: _auth.getUser, addJob: _jobs.addJob, likeJob: _jobs.likeJob, addLane: _jobs.addLane, attachToLane: _jobs.attachToLane, hover: _jobs.hover, move: _jobs.move, getLanes: _jobs.getLanes, getJobs: _jobs.getJobs };
	// export default Actions;
	exports.init = _jobs.init;
	exports.loginPopup = _jobs.loginPopup;
	exports.auth = _auth.auth;
	exports.getUser = _auth.getUser;
	exports.addJob = _jobs.addJob;
	exports.likeJob = _jobs.likeJob;
	exports.dislikeJob = _jobs.dislikeJob;
	exports.addLane = _jobs.addLane;
	exports.attachToLane = _jobs.attachToLane;
	exports.hover = _jobs.hover;
	exports.move = _jobs.move;
	exports.getLanes = _jobs.getLanes;

/***/ }

})