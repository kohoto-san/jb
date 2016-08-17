webpackHotUpdate(0,{

/***/ 589:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.loginPopup = exports.data = exports.user = exports.allJobs = exports.entities = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _redux = __webpack_require__(177);

	var _reactAddonsUpdate = __webpack_require__(590);

	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

	var _merge = __webpack_require__(592);

	var _merge2 = _interopRequireDefault(_merge);

	var _ActionTypes = __webpack_require__(498);

	var types = _interopRequireWildcard(_ActionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function data() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];


	    switch (action.type) {
	        case 'INIT':
	            console.log('case type');
	            console.log(action);
	            return action;

	        default:
	            return state;
	    }

	    /*
	    console.log("ACTION")
	    console.log(action)
	     if( action.type == 'INIT' ){
	        return action;
	    }
	    else{
	        return state;
	    }
	    */
	}

	function loginPopup() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? { isShow: false } : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case 'LOGIN_POPUP':
	            console.log('reducer');
	            return { isShow: action.isShow };

	        default:
	            return state;
	    }
	}

	// const isAuth = localStorage.getItem('sagfi_token') ? true : false;
	// function user( state={isAuth: false, first_name: ''}, action){
	function user() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {

	        case types.GET_USER_SUCCESS:
	            // console.log('               ')
	            // console.log(action)
	            // console.log('               ')
	            return Object.assign({}, state, {
	                first_name: action.payload.first_name,
	                isAuth: true
	            });

	        case types.LOGIN_SUCCESS:
	            return Object.assign({}, state, {
	                isAuth: true
	            });

	        case types.LOGOUT:
	            return Object.assign({}, state, {
	                isAuth: false
	            });

	        default:
	            return state;

	    }
	}

	// const jobs = (state=[], action) => {
	function jobs1() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        /*
	        case 'LIKE_JOB':
	            return[
	                ...state,
	                {
	                    index: state.index,
	                }
	            ]
	        */

	        case 'ADD_JOB':
	            return [].concat(_toConsumableArray(state), [{
	                id: action.id,
	                data: action.job,
	                stage: 'no'
	            }
	            /*
	            Object.assign({}, state.initJobs, {
	                id: action.id,
	                data: action.job
	            })
	            */
	            ]);

	        case 'LIKE_JOB':
	            return state.map(function (job) {
	                return job.id === action.id ? Object.assign({}, job, { stage: 'like' }) : job;
	            });

	        default:
	            return state;
	    }
	}

	function lanesOld() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    var _ret = function () {
	        switch (action.type) {

	            case 'ADD_LANE':
	                return {
	                    v: [].concat(_toConsumableArray(state), [{
	                        id: action.id,
	                        name: action.name,
	                        jobs: []
	                    }])
	                };

	            case 'ATTACH_TO_LANE':
	                return {
	                    v: state.map(function (lane) {

	                        if (lane.jobs.includes(action.jobId)) {
	                            lane.jobs = lane.jobs.filter(function (job) {
	                                return job !== action.jobId;
	                            });
	                        }

	                        // if(lane.id === action.laneId && !lane.jobs.includes(action.jobId)){
	                        if (lane.id === action.laneId) {
	                            lane.jobs = [].concat(_toConsumableArray(lane.jobs), [action.jobId]);
	                        }

	                        return lane;
	                    })
	                };

	            case 'MOVE':
	                var lanes = state;
	                // console.log('=========STATE==========')
	                // console.log(state[0].jobs)
	                var sourceLane = lanes.filter(function (lane) {
	                    return lane.jobs.includes(action.sourceId);
	                })[0];
	                var targetLane = lanes.filter(function (lane) {
	                    return lane.jobs.includes(action.targetId);
	                })[0];
	                var sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId);
	                var targetNoteIndex = targetLane.jobs.indexOf(action.targetId);

	                var newSourceLane = void 0;
	                var newTargetLane = void 0;
	                var newLane = void 0;

	                //move jobs inside one lane (just sort)
	                if (sourceLane === targetLane) {
	                    newSourceLane = (0, _reactAddonsUpdate2.default)(sourceLane, {
	                        jobs: {
	                            $splice: [[sourceNoteIndex, 1], [targetNoteIndex, 0, action.sourceId]]
	                        }
	                        // name: {$set: 'WTFBLEYAT'}
	                    });
	                } else {
	                    newSourceLane = (0, _reactAddonsUpdate2.default)(sourceLane, {
	                        jobs: {
	                            $splice: [[sourceNoteIndex, 1]]
	                        }
	                    });

	                    newTargetLane = (0, _reactAddonsUpdate2.default)(targetLane, {
	                        jobs: {
	                            $splice: [[targetNoteIndex, 0, action.sourceId]]
	                        }
	                    });
	                }

	                var logging = { sourceId: action.sourceId, targetId: action.targetId, name: sourceLane.name,
	                    sourceLane: sourceLane.id, targetLane: targetLane.id };
	                // console.log(logging)

	                return {
	                    v: state.map(function (lane) {
	                        if (lane.id === sourceLane.id) return newSourceLane;else if (lane.id === targetLane.id) return newTargetLane;else return lane;
	                    })
	                };

	            default:
	                return {
	                    v: state
	                };

	        }
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	function move(state, action) {
	    var lanes = state.lanes;

	    var sourceLane = lanes.filter(function (lane) {
	        return lane && lane.jobs && lane.jobs.includes(action.sourceId);
	    })[0];
	    var targetLane = lanes.filter(function (lane) {
	        return lane && lane.jobs && lane.jobs.includes(action.targetId);
	    })[0];

	    console.log('!!!!!!!!!!!1');
	    console.log(sourceLane);
	    console.log(targetLane);

	    var sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId);
	    var targetNoteIndex = targetLane.jobs.indexOf(action.targetId);

	    var newSourceLane = void 0;
	    var newTargetLane = void 0;
	    var newLane = void 0;

	    var sourceJob = state.jobs.filter(function (job) {
	        return job && job.id == action.sourceId;
	    })[0];
	    var targetJob = state.jobs.filter(function (job) {
	        return job && job.id == action.targetId;
	    })[0];

	    var sourcePosition = sourceJob.position;
	    var targetPosition = targetJob.position;

	    // const ids = new Set(sourceLane.jobs)
	    // const currentJobs = new Set([sourceJob.id, targetJob.id])

	    var newJobs = state.jobs.map(function (job) {
	        if (job && job.id == sourceJob.id) {
	            return (0, _reactAddonsUpdate2.default)(job, {
	                position: { $set: targetPosition }
	            });
	        } else if (job && job.id == targetJob.id) {
	            return (0, _reactAddonsUpdate2.default)(job, {
	                position: { $set: sourcePosition }
	            });
	        } else {
	            return job;
	        }
	    });

	    var newLanes = void 0;
	    if (sourceLane != targetLane) {

	        newLanes = state.lanes.map(function (lane) {
	            if (lane && sourceLane.id === lane.id) {
	                return (0, _reactAddonsUpdate2.default)(lane, {
	                    jobs: {
	                        $splice: [[sourceNoteIndex, 1]]
	                    }
	                });
	            } else if (lane && targetLane.id === lane.id) {
	                return (0, _reactAddonsUpdate2.default)(lane, {
	                    jobs: {
	                        $splice: [[targetNoteIndex, 0, action.sourceId]]
	                    }
	                });
	            } else {
	                return lane;
	            }
	        });
	    }

	    var newState = {
	        lanes: newLanes ? newLanes : state.lanes,
	        jobs: newJobs
	    };

	    return newState;

	    /*
	    //move jobs inside one lane (just sort)
	    if(sourceLane === targetLane) {
	        newSourceLane = update(sourceLane, {
	            jobs: {
	                $splice: [
	                    [sourceNoteIndex, 1],
	                    [targetNoteIndex, 0, action.sourceId]
	                ]
	            }
	            // name: {$set: 'WTFBLEYAT'}
	        });
	    }
	    else{
	        newSourceLane = update(sourceLane, {
	            jobs: {
	                $splice: [
	                    [sourceNoteIndex, 1]
	                ]
	            }
	        });
	         newTargetLane = update(targetLane, {
	            jobs: {
	                $splice: [
	                    [targetNoteIndex, 0, action.sourceId]
	                ]
	            }
	        });
	    }
	     // const logging = {sourceId: action.sourceId, targetId: action.targetId, name: sourceLane.name,
	                     // sourceLane: sourceLane.id, targetLane: targetLane.id}
	    // console.log(logging)
	     return lanes.map(lane => {
	        if(lane.id === sourceLane.id)
	            return newSourceLane
	        else if(lane.id === targetLane.id)
	            return newTargetLane
	        else
	            return lane
	    })
	    */
	}

	function attachToLane(state, action) {
	    var lanes = state.lanes;

	    var targetLane = lanes.filter(function (lane) {
	        return lane && lane.id == action.laneId;
	    })[0];
	    var sourceLane = lanes.filter(function (lane) {
	        return lane && lane.jobs && lane.jobs.includes(action.sourceId);
	    })[0];

	    // console.log(lanes)
	    // console.log(sourceLane)
	    // console.log(action.sourceId)

	    var sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId);
	    var targetNoteIndex = targetLane.jobs.indexOf(action.targetId);

	    var sourceJob = state.jobs.filter(function (job) {
	        if (job) return job.id == action.sourceId;
	    })[0];

	    var newSourceLane = void 0;
	    var newTargetLane = void 0;
	    var newLane = void 0;

	    var targetPosition = 0;

	    // const ids = new Set(sourceLane.jobs)
	    // const currentJobs = new Set([sourceJob.id, targetJob.id])

	    var newJobs = state.jobs.map(function (job) {
	        if (job && job.id == sourceJob.id) {
	            return (0, _reactAddonsUpdate2.default)(job, {
	                position: { $set: targetPosition }
	            });
	        } else {
	            return job;
	        }
	    });

	    var newLanes = void 0;
	    // if(sourceLane != targetLane) {

	    newLanes = state.lanes.map(function (lane) {

	        if (lane && sourceLane.id === lane.id && lane.jobs) {
	            return (0, _reactAddonsUpdate2.default)(lane, {
	                jobs: {
	                    $splice: [[sourceNoteIndex, 1]]
	                }
	            });
	        } else if (lane && targetLane.id === lane.id && lane.jobs) {
	            return (0, _reactAddonsUpdate2.default)(lane, {
	                jobs: {
	                    $splice: [[targetNoteIndex, 0, action.sourceId]]
	                }
	            });
	        } else {
	            return lane;
	        }
	    });
	    // }

	    var newState = {
	        lanes: newLanes ? newLanes : state.lanes,
	        jobs: newJobs
	    };

	    return newState;
	}

	function likeJob(state, action) {
	    var lanes = state.lanes;

	    var targetLane = lanes.filter(function (lane) {
	        return lane && lane.id == action.laneId;
	    })[0];
	    var targetNoteIndex = targetLane.jobs.indexOf(action.targetId);
	    var sourceJob = state.jobs.filter(function (job) {
	        return job.id == action.sourceId;
	    })[0];

	    var newLane = void 0;
	    var targetPosition = 0;

	    var newJobs = state.jobs.map(function (job) {

	        // if(job.id == sourceJob.id){
	        if (job.id == action.sourceId) {
	            return (0, _reactAddonsUpdate2.default)(job, {
	                position: { $set: targetPosition }
	            });
	        } else {
	            return job;
	        }
	    });

	    var newLanes = void 0;
	    // if(sourceLane != targetLane) {

	    newLanes = state.lanes.map(function (lane) {

	        if (targetLane.id === lane.id && lane.jobs) {
	            return (0, _reactAddonsUpdate2.default)(lane, {
	                jobs: {
	                    $splice: [[targetNoteIndex, 0, action.sourceId]]
	                }
	            });
	        } else {
	            return lane;
	        }
	    });
	    // }

	    var newState = {
	        lanes: newLanes ? newLanes : state.lanes,
	        jobs: newJobs
	    };

	    return newState;
	}

	function dislikeJob(state, action) {
	    var lanes = state.lanes;

	    var targetLane = lanes.filter(function (lane) {
	        return lane.id == action.laneId;
	    })[0];
	    var targetNoteIndex = targetLane.jobs.indexOf(action.targetId);
	    var sourceJob = state.jobs.filter(function (job) {
	        return job.id == action.sourceId;
	    })[0];

	    var newLane = void 0;
	    var targetPosition = 0;

	    var newJobs = (0, _reactAddonsUpdate2.default)(this.state.jobs, {
	        $splice: [[targetNoteIndex, 1]]
	    });

	    /*
	    let newJobs = state.jobs.map(job => {
	         if(job.id == action.sourceId){
	            return update(job, {
	                position: {$set: targetPosition}
	            })
	        }
	        else{
	            return job
	        }
	    })
	    */

	    var newLanes = void 0;

	    newLanes = state.lanes.map(function (lane) {
	        if (targetLane.id === lane.id && lane.jobs) {
	            return (0, _reactAddonsUpdate2.default)(lane, {
	                jobs: {
	                    $splice: [[targetNoteIndex, 1]]
	                }
	            });
	        } else {
	            return lane;
	        }
	    });

	    var newState = {
	        lanes: newLanes ? newLanes : state.lanes,
	        jobs: newJobs
	    };

	    return newState;
	}

	function entities() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? { lanes: [], jobs: [] } : arguments[0];
	    var action = arguments[1];

	    if (action.response && action.response.entities) {
	        // alert('fuck you')
	        return (0, _merge2.default)({}, state, action.response.entities);
	    }

	    switch (action.type) {
	        case "GET_LANES_SUCCESS":
	            return (0, _merge2.default)({}, state, action.payload.entities);

	        case 'MOVE_SUCCESS':
	            return move(state, action.payload);
	        // alert(JSON.stringify(state, null, 4));
	        // console.log('ACTION')
	        // console.log('ACTION')
	        // console.log(action.payload)

	        /*
	        return{
	            lanes: move(state.lanes, action),
	            jobs: [...state.jobs]
	        }
	        */

	        case 'ATTACH_TO_LANE':
	            return attachToLane(state, action.payload);

	        case 'LIKE_SUCCESS':
	            return likeJob(state, action.payload);

	        case 'DISLIKE_SUCCESS':
	            return dislikeJob(state, action.payload);

	        default:
	            return state;
	    }
	}

	/*
	function lanes(state=[], action){
	    switch(action.type){
	        
	        case 'GET_LANES_SUCCESS':
	            alert(JSON.stringify(action.payload.entities, null, 4));
	            const lanes = action.payload.entities.lanes
	            return[
	                 ...state,
	                {
	                    id: action.id,
	                    name: lanes.name,
	                    jobs: lanes.jobs
	                }
	            ]

	        default:
	            // alert('default')
	            if (action.entities && action.entities.lanes) {
	                return merge([], state, action.entities.lanes);
	            }
	            return state;
	    }
	}

	function jobs (state=[], action) {
	    switch(action.type){
	        default:
	            return state
	    }
	}

	const entities = combineReducers({
	    lanes,
	    jobs
	});
	*/

	function allJobs() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    if (action.type == "GET_JOBS_SUCCESS") {
	        return (0, _merge2.default)([], state, action.payload);
	    }

	    return state;
	}

	exports.entities = entities;
	exports.allJobs = allJobs;
	exports.user = user;
	exports.data = data;
	exports.loginPopup = loginPopup;

	// export { jobs, lanes }

	/*
	const likeJobs = (state = [], action) => {
	    switch(action.type){
	        
	        case 'LIKE_JOB':
	            if( state.likeJobs.filter )
	            return[
	                ...state,
	                {
	                    id: action.id
	                }
	            ]

	            // return Object.assign({}, state.likeJobs, {
	                // id: action.id
	            // })

	        default:
	            return state
	    }
	}
	*/

	/*
	const appReducer = combineReducers({
	    jobs
	    // likeJobs
	})
	*/

	// export default appReducer

/***/ }

})