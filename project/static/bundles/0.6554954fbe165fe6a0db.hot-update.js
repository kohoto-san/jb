webpackHotUpdate(0,{

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Lane = exports.Pipeline = undefined;

	var _index = __webpack_require__(353);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(358);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(3);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(359);

	var _index6 = _interopRequireDefault(_index5);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dec, _dec2, _class, _dec3, _class2, _dec4, _class3;

	var _redux = __webpack_require__(177);

	var _reactDnd = __webpack_require__(511);

	var _reactDndHtml5Backend = __webpack_require__(566);

	var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

	var _pipeline = __webpack_require__(509);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
		Job: {
			displayName: 'Job'
		},
		Lane: {
			displayName: 'Lane'
		},
		Pipeline: {
			displayName: 'Pipeline'
		}
	};

	var _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
		filename: '/home/misha/Projects/jobboard/project/static/js/components/pipeline.js',
		components: _components,
		locals: [module],
		imports: [_react3.default]
	});

	var _homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
		filename: '/home/misha/Projects/jobboard/project/static/js/components/pipeline.js',
		components: _components,
		locals: [],
		imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
		return function (Component) {
			return _homeMishaProjectsJobboardNode_modulesReactTransformHmrLibIndexJs2(_homeMishaProjectsJobboardNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
		};
	} // import { PropTypes } from 'react'


	var jobSource = {
		beginDrag: function beginDrag(props) {
			return {
				jobId: props.job.job_id,
				id: props.id,
				laneId: props.job.lane_id
			};
		},
		isDragging: function isDragging(props, monitor) {
			return props.id === monitor.getItem().id;
		}
	};

	var jobTarget = {
		/*
	 hover(targetProps, monitor) {
	 	const targetId = targetProps.id;
	     const sourceId = monitor.getItem().id;
	 	    if(sourceId !== targetId) {
	 		targetProps.onHover(sourceId, targetId);
	     }
	 }
	 */

		hover: function hover(targetProps, monitor) {
			var targetId = targetProps.job.id;
			var sourceId = monitor.getItem().id;

			// Don't replace items with themselves
			if (targetId !== sourceId) {
				targetProps.onMove(sourceId, targetId);
			}
		}

		/*
	 drop(targetProps, monitor) {
	 	const targetId = targetProps.job.id;
	     const sourceId = monitor.getItem().id;
	 	    // Don't replace items with themselves
	     if (targetId !== sourceId) {
	 		targetProps.onMove(sourceId, targetId);
	     }
	 	}
	 */

	};

	var Job = _wrapComponent('Job')((_dec = (0, _reactDnd.DragSource)('job', jobSource, function (connect, monitor) {
		return {
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging()
		};
	}), _dec2 = (0, _reactDnd.DropTarget)('job', jobTarget, function (connect, monitor) {
		return {
			connectDropTarget: connect.dropTarget(),
			isOver: monitor.isOver()
		};
	}), _dec(_class = _dec2(_class = function (_React$Component) {
		_inherits(Job, _React$Component);

		function Job() {
			_classCallCheck(this, Job);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Job).apply(this, arguments));
		}

		_createClass(Job, [{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				return this.props.connectDragSource !== nextProps.connectDragSource || this.props.connectDropTarget !== nextProps.connectDropTarget || this.props.isDragging !== nextProps.isDragging || this.props.isOver !== nextProps.isOver || this.props.job !== nextProps.job;
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props;
				var connectDragSource = _props.connectDragSource;
				var connectDropTarget = _props.connectDropTarget;
				var isDragging = _props.isDragging;
				var isOver = _props.isOver;

				// console.log('isDragging ' + isDragging)

				// return connectDragSource(connectDropTarget(

				return connectDragSource(_react3.default.createElement(
					'div',
					{ className: 'job', style: { opacity: isDragging || isOver ? 0 : 1 } },
					_react3.default.createElement(
						'a',
						{ className: 'card z-depth-1' },
						_react3.default.createElement(
							'p',
							{ className: 'job-name' },
							this.props.job.job__name
						),
						_react3.default.createElement(
							'p',
							{ className: 'company-name' },
							this.props.job.job__company
						)
					)
				));
			}
		}]);

		return Job;
	}(_react3.default.Component)) || _class) || _class));

	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////

	var laneTarget = {
		/*
	 drop(targetProps, monitor) {
	     const sourceId = monitor.getItem().id;
	 	    // If the target lane doesn't have notes, attach the note to it.
	     //
	     // `attachToLane` performs necessarly cleanup by default and it guarantees
	     // a note can belong only to a single lane at a time.
	     
	     // if length == 0
	     if( ! targetProps.lane.jobs.length) {
	 		targetProps.attachToLane(
	 			targetProps.lane.id,
	 			sourceId
	 		);
	     }
	 }
	 */

		hover: function hover(targetProps, monitor) {
			var sourceJobId = monitor.getItem().id;
			var sourceLaneId = monitor.getItem().laneId;
			var targetLaneId = targetProps.lane.id;

			var laneHasJob = targetProps.lane.jobs.includes(sourceJobId);
			// console.log(laneHasJob)

			// if( ! targetProps.lane.jobs.length) {
			if (!laneHasJob && sourceLaneId !== targetLaneId) {
				// console.log(' IFFFIFIFIIF ')
				// console.log(sourceLaneId)
				// console.log(monitor.getItem())
				// console.log(sourceLaneId + '  ---  ' + targetLaneId)
				targetProps.attachToLane(targetLaneId, sourceLaneId, sourceJobId);
			}
		}
	};

	var Lane = _wrapComponent('Lane')((_dec3 = (0, _reactDnd.DropTarget)('job', laneTarget, function (connect) {
		return {
			connectDropTarget: connect.dropTarget()
		};
	}), _dec3(_class2 = function (_React$Component2) {
		_inherits(Lane, _React$Component2);

		function Lane() {
			_classCallCheck(this, Lane);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Lane).apply(this, arguments));
		}

		_createClass(Lane, [{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				return this.props.connectDropTarget !== nextProps.connectDropTarget || this.props.jobs !== nextProps.jobs || this.props.lane !== nextProps.lane;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var connectDropTarget = this.props.connectDropTarget;


				return connectDropTarget(_react3.default.createElement(
					'div',
					{ className: 'lane col' },
					_react3.default.createElement(
						'div',
						{ className: 'lane-content' },
						_react3.default.createElement(
							'div',
							{ className: 'header center-align' },
							_react3.default.createElement(
								'p',
								{ className: 'card z-depth-1 ' },
								this.props.lane.name
							)
						),
						this.props.jobs.map(function (job) {
							return _react3.default.createElement(Job, {
								id: job.id,
								key: job.id,
								job: job
								// onFuck={ ({sourceId, targetId}) =>{return true}
								// console.log(`source: ${sourceId}, target: ${targetId}`)
								// }
								, onMove: function onMove(sourceId, targetId) {
									return _this3.props.onMove(sourceId, targetId);
								}
							});
						})
					)
				));
			}
		}]);

		return Lane;
	}(_react3.default.Component)) || _class2));

	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////

	function selectJobsByIds(allJobs) {
		var jobsIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];


		var ids = new Set(jobsIds);

		var selectJobs = allJobs.filter(function (job) {
			if (job) {
				return ids.has(job.id);
			}
		}).sort(function (a, b) {
			return a.position - b.position;
		});

		return selectJobs;

		/*
	 	let selectJobs = jobsIds.reduce((jobs, id) =>
	 		jobs.concat(
	 			allJobs.filter(job => {
	 				if(job)	return job.id === id
	 			})
	 		), []);
	 */
	}

	var Pipeline = _wrapComponent('Pipeline')((_dec4 = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec4(_class3 = function (_React$Component3) {
		_inherits(Pipeline, _React$Component3);

		function Pipeline() {
			_classCallCheck(this, Pipeline);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Pipeline).apply(this, arguments));
		}

		_createClass(Pipeline, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (localStorage.getItem('sagfi_token')) {
					this.props.getLanes();
				} else {
					this.props.loginPopupShow();
				}
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				return this.props.entities !== nextProps.entities;
			}
		}, {
			key: 'renderLanes',
			value: function renderLanes() {
				var _this5 = this;

				if (this.props.entities.jobs.length) {
					return this.props.entities.lanes.map(function (lane) {

						if (lane) {
							return _react3.default.createElement(Lane, {
								key: lane['name'],
								lane: lane,
								jobs: selectJobsByIds(_this5.props.entities.jobs, lane.jobs),
								onMove: function onMove(sourceId, targetId) {
									return _this5.props.onMove(sourceId, targetId);
								},
								attachToLane: function attachToLane(targetLaneId, sourceLaneId, sourceJobId) {
									return _this5.props.attachToLane(targetLaneId, sourceLaneId, sourceJobId);
								}
							});
						}
					});
				} else {
					return _react3.default.createElement(
						'p',
						null,
						'No jobs yet.'
					);
				}
			}
		}, {
			key: 'render',
			value: function render() {

				return _react3.default.createElement(
					'div',
					{ id: 'grid', className: 'grid row' },
					this.renderLanes()
				);
			}
		}]);

		return Pipeline;
	}(_react3.default.Component)) || _class3));

	exports.Pipeline = Pipeline;
	exports.Lane = Lane;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(352)(module)))

/***/ }

})