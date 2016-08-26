webpackHotUpdate(0,{

/***/ 584:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _reactRedux = __webpack_require__(191);

	var _jquery = __webpack_require__(507);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _actions = __webpack_require__(496);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
		JobDetails: {
			displayName: 'JobDetails'
		}
	};

	var _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
		filename: '/home/misha/Projects/jobboard/project/static/js/components/jobDetails.js',
		components: _components,
		locals: [module],
		imports: [_react3.default]
	});

	var _homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
		filename: '/home/misha/Projects/jobboard/project/static/js/components/jobDetails.js',
		components: _components,
		locals: [],
		imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
		return function (Component) {
			return _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2(_homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
		};
	}

	var JobDetails = _wrapComponent('JobDetails')(function (_React$Component) {
		_inherits(JobDetails, _React$Component);

		function JobDetails(props) {
			_classCallCheck(this, JobDetails);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JobDetails).call(this, props));

			_this.state = {
				job: [],
				keywords: [],
				skills: []
			};

			// this.changeActiveClient = this.changeActiveClient.bind(this);
			return _this;
		}

		_createClass(JobDetails, [{
			key: 'componentDidMount',
			value: function componentDidMount() {

				var id = this.props.slug.split('-')[0];

				_jquery2.default.ajax({
					url: '/api/job/' + id,
					dataType: 'json',
					cache: false,
					success: function (data) {
						this.setState({ job: data });
						this.setState({ keywords: data.keywords });
						this.setState({ skills: data.skills });
					}.bind(this),
					error: function (xhr, status, err) {
						console.error(status, err.toString());
					}.bind(this)
				});
			}
		}, {
			key: 'share',
			value: function share(e, href) {

				e.preventDefault();

				var width = 575,
				    height = 400,
				    left = ((0, _jquery2.default)(window).width() - width) / 2,
				    top = ((0, _jquery2.default)(window).height() - height) / 2,
				    opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

				var url = void 0;

				if (href.includes('twitter')) {
					url = href + this.state.job.name + ' at ' + this.state.job.company;
				} else {
					url = href + window.location.href;
				}

				window.open(url, 'sharing', opts);

				return false;
			}
		}, {
			key: 'renderText',
			value: function renderText() {
				return { __html: this.state.job.text };
			}
		}, {
			key: 'renderLikeButton',
			value: function renderLikeButton() {
				var _this2 = this;

				if (this.props.isLiked) {
					return _react3.default.createElement(
						'a',
						{ className: 'btn-like waves-effect btn', href: '#', onClick: function onClick(e) {
								e.preventDefault();
								if (localStorage.getItem('sagfi_token')) {
									_this2.props.onLike(_this2.state.job.id);
								} else {
									_this2.props.loginPopup('show');
								}
							} },
						'Like'
					);
				} else {
					return _react3.default.createElement(
						'a',
						{ className: 'btn-like waves-effect btn disabled', href: '#', onClick: function onClick(e) {
								e.preventDefault();
							} },
						'Liked'
					);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				return _react3.default.createElement(
					'div',
					{ className: 'container' },
					_react3.default.createElement(
						'div',
						{ id: 'grid', className: 'full-job grid row' },
						_react3.default.createElement(
							'div',
							{ className: 'col s12 l10 offset-l1', style: { width: '700px' } },
							_react3.default.createElement(
								'div',
								{ className: 'card' },
								_react3.default.createElement(
									'div',
									{ className: 'card-content' },
									_react3.default.createElement(
										'h1',
										{ className: 'job-name center-align' },
										this.state.job.name
									),
									_react3.default.createElement(
										'span',
										{ className: 'job-company card-title center-align' },
										this.state.job.company
									),
									_react3.default.createElement(
										'div',
										{ className: 'job-details' },
										_react3.default.createElement(
											'p',
											{ className: 'left-align' },
											this.state.job.salary
										),
										_react3.default.createElement(
											'p',
											{ className: 'right-align' },
											this.state.job.exp
										)
									),
									_react3.default.createElement('div', { className: 'job-text', dangerouslySetInnerHTML: this.renderText() })
								)
							),
							_react3.default.createElement(
								'div',
								{ className: 'card' },
								_react3.default.createElement(
									'div',
									{ className: 'card-content' },
									_react3.default.createElement(
										'div',
										{ className: 'job-keywords' },
										this.state.keywords.map(function (keyword) {
											return keyword['name'];
										}).join(', ')
									),
									_react3.default.createElement(
										'div',
										{ className: 'job-skills' },
										this.state.skills.map(function (skill, index) {
											return _react3.default.createElement(
												'span',
												{ key: skill.id },
												' ',
												skill.name,
												' '
											);
										})
									)
								)
							),
							_react3.default.createElement(
								'div',
								{ className: 'card' },
								_react3.default.createElement(
									'div',
									{ className: 'card-content share-btns-wrapper' },
									_react3.default.createElement(
										'span',
										null,
										'Share'
									),
									_react3.default.createElement(
										'a',
										{ onClick: function onClick(e) {
												return _this3.share(e, 'http://twitter.com/share?text=');
											}, href: '#', target: '_blank' },
										_react3.default.createElement('i', { className: 'fa fa-twitter', 'aria-hidden': 'true' })
									),
									_react3.default.createElement(
										'a',
										{ onClick: function onClick(e) {
												return _this3.share(e, 'https://www.facebook.com/sharer/sharer.php?u=');
											}, href: '#', target: '_blank' },
										_react3.default.createElement('i', { className: 'fa fa-facebook', 'aria-hidden': 'true' })
									)
								)
							),
							_react3.default.createElement(
								'a',
								{ className: 'btn-apply waves-effect btn', href: this.state.job.url, target: '_blank' },
								'Apply'
							),
							this.renderLikeButton()
						),
						' '
					),
					' '
				);
			}
		}]);

		return JobDetails;
	}(_react3.default.Component));

	var mapStateToProps = function mapStateToProps(state, ownProps) {

		// const likes_arr = state.entities.jobs.map(job => { if(job) return job.job_id })
		// const likes = new Set(likes_arr);

		var currentJobId = ownProps.params.slug.split('-')[0];
		var likes_arr = state.entities.jobs.filter(function (job) {
			return job && job.job_id == currentJobId;
		});

		return {
			isLiked: likes_arr ? true : false,
			slug: ownProps.params.slug
		};
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			onLike: function onLike(jobId) {
				dispatch((0, _actions.likeJob)(jobId));
			},

			loginPopup: function loginPopup(step) {
				dispatch((0, _actions.loginPopup)(step));
			}
		};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(JobDetails);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(352)(module)))

/***/ }

})