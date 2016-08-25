webpackHotUpdate(0,{

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.VisiblePipeline = undefined;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(191);

	var _pipeline = __webpack_require__(510);

	var _actions = __webpack_require__(496);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps = function mapStateToProps(state) {

	    return {
	        entities: state.entities
	        // jobs: state.entities.jobs,
	        // lanes: state.entities.lanes
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        onMove: function onMove(sourceId, targetId) {
	            dispatch((0, _actions.move)(sourceId, targetId));
	        },

	        attachToLane: function attachToLane(targetLaneId, sourceLaneId, sourceJobId) {
	            dispatch((0, _actions.attachToLane)(targetLaneId, sourceLaneId, sourceJobId));
	        },

	        getLanes: function getLanes() {
	            dispatch((0, _actions.getLanes)());
	        },

	        loginPopupShow: function loginPopupShow() {
	            dispatch((0, _actions.loginPopupShow)());
	        }
	    };
	};

	var VisiblePipeline = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_pipeline.Pipeline);

	/*
	const VisibleJob = connect(
	    mapDispatchToProps
	)(Lane)
	*/

	exports.VisiblePipeline = VisiblePipeline;

/***/ }

})