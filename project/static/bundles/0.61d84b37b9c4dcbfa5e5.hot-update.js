webpackHotUpdate(0,{

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(191);

	var _navbar = __webpack_require__(495);

	var _actions = __webpack_require__(496);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps = function mapStateToProps(state) {

		return {
			// jobs_count: state.jobs.filter(job => job.stage != 'no').length
			jobs_count: state.entities.jobs.filter(function (job) {
				return job;
			}).length,
			user: state.user,
			popupIsShow: state.loginPopup.isShow
		};
	};

	// import { likeJob } from '../actions/actions.js'


	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			/*
	  onLike: (id) => {
	  	dispatch(likeJob(id))
	  },
	  */

			auth: function auth() {
				dispatch((0, _actions.auth)());
			},

			getUser: function getUser() {
				dispatch((0, _actions.getUser)());
			},

			loginPopup: function loginPopup(step) {
				dispatch((0, _actions.loginPopup)(step));
			},

			loginPopupClose: function (_loginPopupClose) {
				function loginPopupClose() {
					return _loginPopupClose.apply(this, arguments);
				}

				loginPopupClose.toString = function () {
					return _loginPopupClose.toString();
				};

				return loginPopupClose;
			}(function () {
				dispatch(loginPopupClose());
			})

		};
	};

	var VisibleNavbar = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_navbar.Navbar);

	exports.default = VisibleNavbar;

	// export default connect(mapStateToProps)(App);

/***/ }

})