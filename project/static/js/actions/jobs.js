import * as types from '../constants/ActionTypes';

import { CALL_API, getJSON } from 'redux-api-middleware';
import { Schema, arrayOf, valuesOf, normalize } from 'normalizr';



export function init () {

	let data_local = localStorage.getItem('sagfi_data');
	let data = [];

	if(data_local) {
		let parsedData = JSON.parse(data_local);
		data = parsedData;
    }

    console.log(data);

	return{
		type: 'INIT',
		data
	}
}

export function loginPopupClose(){
	return{
		type: 'LOGIN_POPUP_CLOSE',
	}
}

export function loginPopupShow(step){
	return{
		type: 'LOGIN_POPUP_SHOW',
	}

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



let nextJobId = 11
let nextLaneId = 0


export function addJob (job) {
	return{
		type: 'ADD_JOB',
		id: nextJobId++,
		job
	}
}

export function addLane (name) {
	return{
		type: 'ADD_LANE',
		id: nextLaneId++,
		name
	}
}

export function likeJob (jobId) {

	return {
	    [CALL_API]: {
	        endpoint: '/api/get-lanes/',
	        method: 'POST',
	        body: JSON.stringify({
				laneName: 'Liked',
				sourceId: jobId
			}),
	        types: [
	            'REQUEST',
	            {
	                type: 'LIKE_SUCCESS',
	                payload: (action, state, res) => {
	                	return getJSON(res).then((json) => {
	                		return{
								laneId: json.laneId,
								sourceId: json.jobId,
								position: json.position
							}
	                	});
	                }
	            },
	            'FAILURE'
	        ]
	    }
	};

	/*
	return{
		type: types.LIKE_JOB,
		id
	}
	*/
}

export function dislikeJob (jobId){


	return {
	    [CALL_API]: {
	        endpoint: '/api/get-lanes/',
	        method: 'DELETE',
	        body: JSON.stringify({
				id: jobId
			}),
	        types: [
	            'REQUEST',
	            {
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
	            },
	            'FAILURE'
	        ]
	    }
	};

}

export function attachToLaneServer (laneId, jobId) {

	return {
	    [CALL_API]: {
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
	        types: [
	            'ATTACH_TO_LANE_REQUEST',
                'ATTACH_TO_LANE_SERVER_SUCCESS',
	            'ATTACH_TO_LANE_FAILURE'
	            
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
	    }
	};
}

export function attachToLane (targetLaneId, sourceLaneId, jobId) {
	return{
		type: 'ATTACH_TO_LANE',
		// sourceId: jobId,
		jobId,
		sourceLaneId,
		targetLaneId
		// laneId
	}
}

export function hover (sourceId, targetId) {

	return{
		type: 'HOVER',
		sourceId,
		targetId
	}
}


export function move (sourceId, targetId) {
	return{
		type: 'MOVE_SUCCESS',
		sourceId,
		targetId
	}
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

let i = -1;

function generateId(){
	i += 1;
	return i;
}

let y = -1;

function gerenateIdLane () {
	y += 1;
	return y;
}

const laneSchema = new Schema('lanes', { idAttribute: 'id' }),
	  jobSchema = new Schema('jobs', { idAttribute: 'id' });

// const laneSchema = new Schema('lanes'),
	  // jobSchema = new Schema('jobs');

// jobSchema = new Schema('jobs', { idAttribute: 'job_id' });

laneSchema.define({
	jobs: valuesOf(jobSchema)
});


function delete_null_properties(test, recurse=true) {
    for (var i in test) {
        if (test[i] === null) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            delete_null_properties(test[i], recurse);
        }
    }
}

export function getLanes() {
  return {
    [CALL_API]: {
        endpoint: '/api/get-lanes/',
        method: 'GET',
        types: [
            /*
            {
                type: types.LOGIN_REQUEST,
                payload: (action, state) => ({ email: email, password: action.password })
            },
            */
            'GET_LANES_REQUEST',
            {
                type: 'GET_LANES_SUCCESS',
                payload: (action, state, res) => {
                	let normal = getJSON(res)
	                	.then((json) => {
	                		return( normalize(json, { lanes: arrayOf(laneSchema) }) )
	                	})
                    
                    return normal;
                	

                	// console.log('normal start')
                	// console.log(normal)
                	// console.log('normal end')
                	// console.log( delete_null_properties(normal) )
	        		// result = delete_null_properties(normal);
                    // console.log('///////result')
                    // console.log(result)
                    // console.log('^^^^result')


                    normal.then((sasi) => { console.log(sasi) });


                	console.log('fuck start')
                    let wtffff = normal.filter(n => { return n != undefined && n != null } );
                	console.log('fuck after')
                	console.log(wtffff)
                	console.log('fuck rnd')
                }
            },
            'GET_LANES_FAILURE'
        ]
    }
  };
}

export function getJobs() {
  return {
    [CALL_API]: {
        endpoint: '/jobs/',
        method: 'GET',
        types: [
            /*
            {
                type: types.LOGIN_REQUEST,
                payload: (action, state) => ({ email: email, password: action.password })
            },
            */
            'REQUEST',
            {
                type: 'GET_JOBS_SUCCESS',
                payload: (action, state, res) => {
                	let norm = getJSON(res);
                    return norm;
                }
            },
            'FAILURE'
        ]
    }
  };
}




