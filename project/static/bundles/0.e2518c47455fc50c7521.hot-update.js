webpackHotUpdate(0,{

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.init = init;
	exports.loginPopupClose = loginPopupClose;
	exports.loginPopupShow = loginPopupShow;
	exports.addJob = addJob;
	exports.addLane = addLane;
	exports.likeJob = likeJob;
	exports.dislikeJob = dislikeJob;
	exports.attachToLaneServer = attachToLaneServer;
	exports.attachToLane = attachToLane;
	exports.hover = hover;
	exports.move = move;
	exports.getLanes = getLanes;
	exports.getJobs = getJobs;

	var _ActionTypes = __webpack_require__(498);

	var types = _interopRequireWildcard(_ActionTypes);

	var _reduxApiMiddleware = __webpack_require__(260);

	var _normalizr = __webpack_require__(500);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function init() {

		var data_local = localStorage.getItem('sagfi_data');
		var data = [];

		if (data_local) {
			var parsedData = JSON.parse(data_local);
			data = parsedData;
		}

		console.log(data);

		return {
			type: 'INIT',
			data: data
		};
	}

	function loginPopupClose() {
		return {
			type: 'LOGIN_POPUP_CLOSE'
		};
	}

	function loginPopupShow(step) {
		return {
			type: 'LOGIN_POPUP_SHOW'
		};

		/*
	 	let isShow;
	 	if(step == 'close'){
	 		isShow = false;
	 	}
	 	else if (step == 'show') {
	 		isShow = true;
	 	}
	 
	 	return{
	 		type: 'LOGIN_POPUP',
	 		isShow
	 	}
	 */
	}

	var nextJobId = 11;
	var nextLaneId = 0;

	function addJob(job) {
		return {
			type: 'ADD_JOB',
			id: nextJobId++,
			job: job
		};
	}

	function addLane(name) {
		return {
			type: 'ADD_LANE',
			id: nextLaneId++,
			name: name
		};
	}

	function likeJob(jobId) {

		return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
			endpoint: '/api/get-lanes/',
			method: 'POST',
			body: JSON.stringify({
				laneName: 'Liked',
				sourceId: jobId
			}),
			types: ['REQUEST', {
				type: 'LIKE_SUCCESS',
				payload: function payload(action, state, res) {
					return (0, _reduxApiMiddleware.getJSON)(res).then(function (json) {
						console.log(json.metajob);
						return {
							laneId: json.laneId,
							sourceId: json.jobId,
							position: json.position,
							metajob: json.metajob
						};
					});
				}
			}, 'FAILURE']
		});

		/*
	 return{
	 	type: types.LIKE_JOB,
	 	id
	 }
	 */
	}

	function dislikeJob(jobId) {

		return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
			endpoint: '/api/get-lanes/',
			method: 'DELETE',
			body: JSON.stringify({
				id: jobId
			}),
			types: ['REQUEST', {
				type: 'DISLIKE_SUCCESS',
				jobId: jobId

				/*
	   payload: (action, state, res) => {
	   	return getJSON(res).then((json) => {
	   		return{
	   laneId: json.laneId,
	   sourceId: json.jobId,
	   position: json.position
	   }
	   	});
	   }
	   */
			}, 'FAILURE']
		});
	}

	function attachToLaneServer(laneId, jobId) {

		return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
			endpoint: '/api/get-lanes/',
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				laneId: laneId,
				sourceId: jobId
			}),
			types: ['ATTACH_TO_LANE_REQUEST', 'ATTACH_TO_LANE_SERVER_SUCCESS', 'ATTACH_TO_LANE_FAILURE'

			/*
	  {
	      type: 'ATTACH_TO_LANE',
	      payload: (action, state) => ({
	  laneId: laneId,
	  sourceId: jobId
	      })
	  },
	  */
			]
		});
	}

	function attachToLane(targetLaneId, sourceLaneId, jobId) {
		return {
			type: 'ATTACH_TO_LANE',
			// sourceId: jobId,
			jobId: jobId,
			sourceLaneId: sourceLaneId,
			targetLaneId: targetLaneId
			// laneId
		};
	}

	function hover(sourceId, targetId) {

		return {
			type: 'HOVER',
			sourceId: sourceId,
			targetId: targetId
		};
	}

	function move(sourceId, targetId) {
		return {
			type: 'MOVE_SUCCESS',
			sourceId: sourceId,
			targetId: targetId
		};
	}

	/*
	export function move (sourceId, targetId) {
		// return{
		// 	type: 'MOVE_SUCCESS',
		// 	sourceId,
		// 	targetId
		// }

		return {
		    [CALL_API]: {
		        endpoint: '/api/get-lanes/',
		        method: 'PATCH',
		        headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json'
				},
		        body: JSON.stringify({
				    sourceId: sourceId,
		        	targetId: targetId
				}),
		        types: [
		            'REQUEST',
		            {
		                type: 'MOVE_SUCCESS',
		                payload: (action, state) => ({
		                	sourceId: sourceId,
		                	targetId: targetId
		                })
		                
		                // sourceId,
		                // targetId

		                /*
		                payload: (action, state, res) => {
		                	// let normal = getJSON(res).then((json) => normalize(json, { lanes: arrayOf(laneSchema) }));
		                	let normal = getJSON(res);
		                	// alert(res)
				            // alert(JSON.stringify(normal, null, 4));

		                    return normal;
		                }
		                /
						
		            },
		            'FAILURE'
		        ]
		    }
		};
	}
	*/

	var i = -1;

	function generateId() {
		i += 1;
		return i;
	}

	var y = -1;

	function gerenateIdLane() {
		y += 1;
		return y;
	}

	var laneSchema = new _normalizr.Schema('lanes', { idAttribute: 'id' }),
	    jobSchema = new _normalizr.Schema('jobs', { idAttribute: 'id' });

	// const laneSchema = new Schema('lanes'),
	// jobSchema = new Schema('jobs');

	// jobSchema = new Schema('jobs', { idAttribute: 'job_id' });

	laneSchema.define({
		jobs: (0, _normalizr.valuesOf)(jobSchema)
	});

	function delete_null_properties(test) {
		var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		for (var i in test) {
			if (test[i] === null) {
				delete test[i];
			} else if (recurse && _typeof(test[i]) === 'object') {
				delete_null_properties(test[i], recurse);
			}
		}
	}

	function getLanes() {
		return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
			endpoint: '/api/get-lanes/',
			method: 'GET',
			types: [
			/*
	  {
	      type: types.LOGIN_REQUEST,
	      payload: (action, state) => ({ email: email, password: action.password })
	  },
	  */
			'GET_LANES_REQUEST', {
				type: 'GET_LANES_SUCCESS',
				payload: function payload(action, state, res) {
					var normal = (0, _reduxApiMiddleware.getJSON)(res).then(function (json) {
						return (0, _normalizr.normalize)(json, { lanes: (0, _normalizr.arrayOf)(laneSchema) });
					});

					return normal;

					// console.log('normal start')
					// console.log(normal)
					// console.log('normal end')
					// console.log( delete_null_properties(normal) )
					// result = delete_null_properties(normal);
					// console.log('///////result')
					// console.log(result)
					// console.log('^^^^result')


					normal.then(function (sasi) {
						console.log(sasi);
					});

					console.log('fuck start');
					var wtffff = normal.filter(function (n) {
						return n != undefined && n != null;
					});
					console.log('fuck after');
					console.log(wtffff);
					console.log('fuck rnd');
				}
			}, 'GET_LANES_FAILURE']
		});
	}

	function getJobs() {
		return _defineProperty({}, _reduxApiMiddleware.CALL_API, {
			endpoint: '/jobs/',
			method: 'GET',
			types: [
			/*
	  {
	      type: types.LOGIN_REQUEST,
	      payload: (action, state) => ({ email: email, password: action.password })
	  },
	  */
			'REQUEST', {
				type: 'GET_JOBS_SUCCESS',
				payload: function payload(action, state, res) {
					var norm = (0, _reduxApiMiddleware.getJSON)(res);
					return norm;
				}
			}, 'FAILURE']
		});
	}

/***/ }

})