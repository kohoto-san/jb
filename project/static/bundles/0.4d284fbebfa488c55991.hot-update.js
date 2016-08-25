webpackHotUpdate(0,{

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Navbar = undefined;

	var _index = __webpack_require__(353);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(358);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(3);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(359);

	var _index6 = _interopRequireDefault(_index5);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reactRouter = __webpack_require__(192);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	    Navbar: {
	        displayName: 'Navbar'
	    }
	};

	var _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	    filename: '/home/misha/Projects/jobboard/project/static/js/components/navbar.js',
	    components: _components,
	    locals: [module],
	    imports: [_react3.default]
	});

	var _homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	    filename: '/home/misha/Projects/jobboard/project/static/js/components/navbar.js',
	    components: _components,
	    locals: [],
	    imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
	    return function (Component) {
	        return _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2(_homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	    };
	}

	// const Navbar = ({ auth, getUser, user, jobs_count }) => {
	var Navbar = _wrapComponent('Navbar')(function (_React$Component) {
	    _inherits(Navbar, _React$Component);

	    function Navbar() {
	        _classCallCheck(this, Navbar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).apply(this, arguments));
	    }

	    _createClass(Navbar, [{
	        key: 'isEmpty',
	        value: function isEmpty(obj) {
	            return Object.keys(obj).length === 0;
	        }
	    }, {
	        key: '_auth',
	        value: function _auth(e) {
	            e.preventDefault();
	            this.props.auth();
	        }
	    }, {
	        key: 'login',
	        value: function login() {
	            var _this2 = this;

	            if (this.isEmpty(this.props.user)) {
	                return _react3.default.createElement(
	                    'a',
	                    { href: '#', onClick: function onClick(e) {
	                            return _this2._auth(e);
	                        } },
	                    'Login via Twitter'
	                );
	            } else {
	                return _react3.default.createElement(
	                    'a',
	                    null,
	                    this.props.user.first_name
	                );
	            }
	        }
	    }, {
	        key: 'popup',
	        value: function popup() {
	            var _this3 = this;

	            if (this.props.popupIsShow) {
	                return _react3.default.createElement(
	                    'div',
	                    { className: 'login-popup' },
	                    _react3.default.createElement(
	                        'a',
	                        { href: '#', className: 'close', onClick: function onClick(e) {
	                                e.preventDefault();
	                                _this3.props.loginPopupClose();
	                                // this.props.loginPopup('close');
	                            } },
	                        _react3.default.createElement(
	                            'i',
	                            { className: 'material-icons' },
	                            'close'
	                        )
	                    ),
	                    _react3.default.createElement(
	                        'div',
	                        { className: 'valign-wrapper' },
	                        _react3.default.createElement(
	                            'a',
	                            { href: '#', className: 'valign soc-button twitter', onClick: function onClick(e) {
	                                    return _this3._auth(e);
	                                } },
	                            'Login via Twitter'
	                        )
	                    )
	                );
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react3.default.createElement(
	                'div',
	                null,
	                this.popup(),
	                _react3.default.createElement(
	                    'div',
	                    { style: { marginBottom: '30px' } },
	                    _react3.default.createElement(
	                        'nav',
	                        { className: 'white black-text', style: { textColor: '#000' } },
	                        _react3.default.createElement(
	                            'div',
	                            _defineProperty({ className: 'nav-wrapper' }, 'className', 'black-text'),
	                            _react3.default.createElement(
	                                _reactRouter.Link,
	                                { to: '/', className: 'brand-logo' },
	                                'Sagfi'
	                            ),
	                            _react3.default.createElement(
	                                'ul',
	                                { className: 'right' },
	                                _react3.default.createElement(
	                                    'li',
	                                    null,
	                                    _react3.default.createElement(
	                                        _reactRouter.Link,
	                                        { to: '/my-jobs', className: 'my-jobs' },
	                                        'My Jobs',
	                                        _react3.default.createElement(
	                                            'span',
	                                            { id: 'jobs-counter' },
	                                            ' ',
	                                            this.props.jobs_count
	                                        )
	                                    )
	                                ),
	                                _react3.default.createElement(
	                                    'li',
	                                    null,
	                                    this.login()
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Navbar;
	}(_react3.default.Component));

	exports.Navbar = Navbar;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(352)(module)))

/***/ }

})