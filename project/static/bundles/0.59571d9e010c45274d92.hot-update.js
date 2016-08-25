webpackHotUpdate(0,{

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.JobList = undefined;

	var _index = __webpack_require__(353);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(358);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(3);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(359);

	var _index6 = _interopRequireDefault(_index5);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.extend = extend;

	var _reactDom = __webpack_require__(37);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(506);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _jquery = __webpack_require__(507);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _reactRouter = __webpack_require__(192);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	    Job: {
	        displayName: 'Job'
	    },
	    PinterestGrid: {
	        displayName: 'PinterestGrid'
	    },
	    JobList: {
	        displayName: 'JobList'
	    }
	};

	var _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	    filename: '/home/misha/Projects/jobboard/project/static/js/components/jobs.js',
	    components: _components,
	    locals: [module],
	    imports: [_react3.default]
	});

	var _homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	    filename: '/home/misha/Projects/jobboard/project/static/js/components/jobs.js',
	    components: _components,
	    locals: [],
	    imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
	    return function (Component) {
	        return _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2(_homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	    };
	}

	// import { PropTypes } from 'react'
	// import VisibleJobs from '../containers/jobs.js'


	// const Job = ({onLike, onDislike, job}) => (
	// const Job = ({job, style, onLike}) => (
	var Job = _wrapComponent('Job')(function (_React$Component) {
	    _inherits(Job, _React$Component);

	    function Job(props) {
	        _classCallCheck(this, Job);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Job).call(this, props));

	        _this.state = {
	            isLiked: _this.props.isLiked
	        };
	        return _this;
	    }

	    _createClass(Job, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return this.props.style !== nextProps.style || this.props.job !== nextProps.job || this.state.isLiked !== nextState.isLiked;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var likeClasses = (0, _classnames2.default)({
	                'like': true,
	                'is_liked': this.state.isLiked
	            });

	            return _react3.default.createElement(
	                'div',
	                { className: 'grid__item col s4', style: this.props.style },
	                _react3.default.createElement(
	                    _reactRouter.Link,
	                    { to: { pathname: '/job/' + this.props.job.slug }, className: 'card z-depth-1' },
	                    _react3.default.createElement(
	                        'div',
	                        { className: 'card-body' },
	                        _react3.default.createElement(
	                            'p',
	                            { className: 'job-name center-align' },
	                            this.props.job.name
	                        ),
	                        _react3.default.createElement(
	                            'p',
	                            { className: 'company-name center-align' },
	                            this.props.job.company
	                        ),
	                        _react3.default.createElement(
	                            'div',
	                            { className: 'job-details' },
	                            _react3.default.createElement(
	                                'p',
	                                { className: 'left-align' },
	                                this.props.job.salary
	                            ),
	                            _react3.default.createElement(
	                                'p',
	                                { className: 'right-align' },
	                                this.props.job.exp
	                            )
	                        ),
	                        _react3.default.createElement(
	                            'div',
	                            { className: 'job-keywords job-keys' },
	                            this.props.job.keywords.map(function (keyword) {
	                                return keyword['name'];
	                            }).join(', ')
	                        )
	                    ),
	                    _react3.default.createElement(
	                        'div',
	                        { className: 'job-skills job-keys' },
	                        this.props.job.skills.map(function (skill, index) {
	                            return _react3.default.createElement(
	                                'span',
	                                { key: skill.id },
	                                ' ',
	                                skill.name,
	                                ' '
	                            );
	                        })
	                    )
	                ),
	                ' ',
	                _react3.default.createElement(
	                    'div',
	                    { className: 'job-actions' },
	                    _react3.default.createElement(
	                        'a',
	                        { href: '#', className: likeClasses, onClick: function onClick(e) {
	                                e.preventDefault();
	                                if (localStorage.getItem('sagfi_token')) {
	                                    if (_this2.props.isLiked) {
	                                        // this.props.onDislike();
	                                    } else {
	                                        _this2.setState({ isLiked: true });
	                                        _this2.props.onLike();
	                                    }
	                                } else {
	                                    _this2.props.loginPopupShow();
	                                }
	                            } },
	                        _react3.default.createElement(
	                            'i',
	                            { className: 'material-icons' },
	                            ''
	                        ),
	                        '  '
	                    )
	                )
	            );
	        }
	    }]);

	    return Job;
	}(_react3.default.Component));

	/**
	 * Utility function for extending an object with other objects
	 * @param {object} base - the object to extend
	 * @param {array} ...args - the objects to do the extending
	 * @returns {object} <base> extended
	 */


	function extend(base) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    args.forEach(function (arg) {
	        if (arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
	            Object.keys(arg || {}).forEach(function (key) {
	                base[key] = arg[key];
	            });
	        }
	    });
	    return base;
	}

	var PinterestGrid = _wrapComponent('PinterestGrid')(function (_React$Component2) {
	    _inherits(PinterestGrid, _React$Component2);

	    function PinterestGrid(props) {
	        _classCallCheck(this, PinterestGrid);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PinterestGrid).call(this, props));

	        _this3.state = {
	            styles: [],
	            isRendered: false
	        };
	        return _this3;
	    }

	    _createClass(PinterestGrid, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.isLoading = true;
	            if (this.props.children.length) {
	                this.layout();
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.layout();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.interval);
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return this.props.children.length || this.props.children.length !== nextProps.children.length || this.state.styles.length !== nextState.styles.length;
	        }

	        /**
	         * Build a style attribute based on passed in styles
	         * and the opacity signifying readiness
	         * @returns {object} style key/value map
	         */

	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            return extend({
	                opacity: this.state.styles.length ? 1 : 0
	            }, this.props.style);
	        }

	        /**
	         * Find which column is the shortest
	         * @param {array} a list of column heights
	         * @returns {number} the index of the column to use
	         */

	    }, {
	        key: 'getShortestColumn',
	        value: function getShortestColumn(columns) {
	            var shortest = columns.reduce(function (smallest, columnHeight) {
	                return columnHeight < smallest ? columnHeight : smallest;
	            });
	            return columns.indexOf(shortest);
	        }

	        /**
	         * Look at the root node and/or its parent, and determine
	         * how many columns we can fit.
	         * @returns {number} the number of columns to use
	         */

	    }, {
	        key: 'getColumnCount',
	        value: function getColumnCount() {
	            if (this.props.columns) {
	                return this.props.columns;
	            } else {
	                var rootNode = _reactDom2.default.findDOMNode(this);
	                var rootWidth = rootNode.offsetWidth || rootNode.parentNode.offsetWidth;
	                // const childNode = rootNode.children[0].firstChild;
	                var childNode = rootNode.children[0].firstChild;
	                var childWidth = childNode.offsetWidth;
	                return Math.floor(rootWidth / (childWidth + this.props.gutter));
	            }
	        }

	        /**
	         * Wait for children to render, and then determine each element's
	         * absolute positioning within the grid
	         * @returns {Promise}
	         */

	    }, {
	        key: 'layout',
	        value: function layout() {
	            var _this4 = this;

	            if (!this.state.isRendered) {
	                this.waitForChildren().then(function () {
	                    var columnCount = _this4.getColumnCount();
	                    if (columnCount) {
	                        (function () {

	                            var gutter = _this4.props.gutter;
	                            // const nodeWidth = ReactDOM.findDOMNode(this.refs['child-0']).offsetWidth;
	                            var nodeWidth = _reactDom2.default.findDOMNode(_this4).children[0].firstChild.offsetWidth;

	                            var columnHeights = Array.apply(null, Array(columnCount)).map(function (x) {
	                                return 0;
	                            });
	                            var styles = _this4.props.children.map(function (child, i) {
	                                var node = _reactDom2.default.findDOMNode(_this4).children[i].firstChild;
	                                var columnIndex = _this4.getShortestColumn(columnHeights);
	                                var top = columnHeights[columnIndex];
	                                var left = columnIndex * (nodeWidth + gutter);
	                                columnHeights[columnIndex] += node.offsetHeight + gutter;

	                                return {
	                                    position: 'absolute',
	                                    top: top + 'px',
	                                    left: left + 'px'
	                                };
	                            });
	                            _this4.setState({ styles: styles, isRendered: true });
	                        })();
	                    }
	                });
	            }
	        }

	        /**
	         * Wait for all children to have been rendered
	         * @returns {Promise}
	         */

	    }, {
	        key: 'waitForChildren',
	        value: function waitForChildren() {
	            var _this5 = this;

	            return new Promise(function (resolve) {
	                _this5.interval = setInterval(function () {
	                    var ready = _this5.props.children.every(function (child, i) {
	                        var node = _reactDom2.default.findDOMNode(_this5).children[i].firstChild;
	                        return node;
	                        // return ReactDOM.findDOMNode(this.refs[`child-${i}`]);
	                    });

	                    if (ready) {
	                        clearInterval(_this5.interval);
	                        resolve();
	                    }
	                }, 50);
	            });
	        }

	        /**
	         * Build out the child nodes with the additional style and ref attributes
	         * @returns {array} a list of ready-to-render child nodes
	         */

	    }, {
	        key: 'getUpdatedChildren',
	        value: function getUpdatedChildren() {
	            var _this6 = this;

	            return _react3.default.Children.map(this.props.children, function (child, i) {

	                var style = child.props.style || {};

	                var newChild = _react3.default.cloneElement(child, {
	                    style: extend({}, _this6.state.styles[i], child.props.style)
	                });

	                _this6.isLoading = false;
	                return newChild;
	            });
	        }

	        /**
	         * Render the children absolutely positioned within parent
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            // <div ref="root" className="pinterest-grid">

	            var content = void 0;
	            content = this.getUpdatedChildren();

	            /*
	            if(this.isLoading){
	                 content = (
	                    <div className="preloader-wrapper big active">
	                        <div className="spinner-layer spinner-blue-only">
	                            <div className="circle-clipper left">
	                                <div className="circle"></div>
	                            </div><div className="gap-patch">
	                                <div className="circle"></div>
	                            </div><div className="circle-clipper right">
	                                <div className="circle"></div>
	                            </div>
	                        </div>
	                    </div>
	                )
	             }
	            else{
	            }
	            */

	            return _react3.default.createElement(
	                'div',
	                { id: 'grid', className: 'autogrid job_list grid row' },
	                content
	            );
	        }
	    }]);

	    return PinterestGrid;
	}(_react3.default.Component));

	PinterestGrid.propTypes = {
	    gutter: _react3.default.PropTypes.number
	};

	PinterestGrid.defaultProps = {
	    gutter: 0
	};

	// const Jobs = ({ jobs }) => (

	var JobList = _wrapComponent('JobList')(function (_React$Component3) {
	    _inherits(JobList, _React$Component3);

	    function JobList(props) {
	        _classCallCheck(this, JobList);

	        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(JobList).call(this, props));

	        _this7.state = {
	            jobs: [],
	            isLoaded: false
	        };
	        return _this7;
	    }

	    _createClass(JobList, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return this.state.jobs !== nextState.jobs || !this.state.isLoaded;

	            // return !this.state.isLoaded;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // this.props.getJobs();

	            _jquery2.default.ajax({
	                url: '/jobs/',
	                dataType: 'json',
	                cache: false,
	                success: function (jobs) {
	                    this.setState({ jobs: jobs });
	                    this.setState({ isLoaded: true });
	                }.bind(this),
	                error: function (xhr, status, err) {
	                    console.error(this.props.url, status, err.toString());
	                }.bind(this)
	            });
	        }
	    }, {
	        key: 'items',
	        value: function items() {
	            var _this8 = this;

	            // return this.props.jobs.map((job, i) =>{
	            return this.state.jobs.map(function (job, i) {

	                var isLiked = _this8.props.likes.has(job.id);

	                return _react3.default.createElement(Job, {
	                    key: job.id,
	                    job: job,
	                    isLiked: isLiked
	                    // ref={`child-${i}`}
	                    , onLike: function onLike() {
	                        return _this8.props.onLike(job.id);
	                    },
	                    onDislike: function onDislike() {
	                        return _this8.props.onDislike(job.id);
	                    },
	                    loginPopupShow: function loginPopupShow() {
	                        return _this8.props.loginPopupShow();
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.state.isLoaded) {
	                return _react3.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    _react3.default.createElement(
	                        PinterestGrid,
	                        { gutter: 20 },
	                        this.items()
	                    )
	                );
	            } else {
	                return _react3.default.createElement(
	                    'div',
	                    { style: { textAlign: 'center' } },
	                    _react3.default.createElement(
	                        'div',
	                        { className: 'preloader-wrapper big active' },
	                        _react3.default.createElement(
	                            'div',
	                            { className: 'spinner-layer spinner-blue-only' },
	                            _react3.default.createElement(
	                                'div',
	                                { className: 'circle-clipper left' },
	                                _react3.default.createElement('div', { className: 'circle' })
	                            ),
	                            _react3.default.createElement(
	                                'div',
	                                { className: 'gap-patch' },
	                                _react3.default.createElement('div', { className: 'circle' })
	                            ),
	                            _react3.default.createElement(
	                                'div',
	                                { className: 'circle-clipper right' },
	                                _react3.default.createElement('div', { className: 'circle' })
	                            )
	                        )
	                    )
	                );
	            }
	        }
	    }]);

	    return JobList;
	}(_react3.default.Component));
	// )

	exports.JobList = JobList;

	/*
	class Home extends React.Component{	

		render() {
			const { jobs } = this.props

			return (
				<div>
					<JobList jobs={this.props.jobs} />

					{jobs}

				</div>
			);
		}

	}
	*/

	// Home.PropTypes = {
	// 	jobs: PropTypes.arrayOf(PropTypes.shape({
	// 	    name: PropTypes.string.isRequired
	// 	}).isRequired).isRequired
	// }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(352)(module)))

/***/ }

})