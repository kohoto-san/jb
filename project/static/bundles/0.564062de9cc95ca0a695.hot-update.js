webpackHotUpdate(0,{

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(191);

	var _jobs = __webpack_require__(505);

	var _actions = __webpack_require__(496);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps = function mapStateToProps(state) {

		var likes_arr = state.entities.jobs.map(function (job) {
			if (job) return job.job_id;
		});
		var likes = new Set(likes_arr);

		return {
			jobs: state.allJobs,
			likes: likes
			// jobs: ownProps.params.jobs
		};
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			onLike: function onLike(jobId) {
				dispatch((0, _actions.likeJob)(jobId));
			},

			onDislike: function onDislike(jobId) {
				dispatch(dislikeJob(jobId));
			},

			getJobs: function getJobs() {
				dispatch((0, _actions.getJobs)());
			},

			loginPopup: function loginPopup(step) {
				console.log('dispatch LoginPopup');
				dispatch((0, _actions.loginPopup)(step));
			}
		};
	};

	var VisibleJobs = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_jobs.JobList);

	exports.default = VisibleJobs;

	// export default connect(mapStateToProps)(App);

/***/ }

})