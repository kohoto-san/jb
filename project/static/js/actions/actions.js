export const LIKE_JOB = 'LIKE_JOB'
export const DISLIKE_JOB = 'DISLIKE_JOB'

import { CALL_API, getJSON } from 'redux-api-middleware';
import { Schema, arrayOf, valuesOf, normalize } from 'normalizr';


let nextJobId = 11
let nextLaneId = 0

export const addJob = (job) => {
	return{
		type: 'ADD_JOB',
		id: nextJobId++,
		job
	}
}

export const likeJob = (id) => {
	return{
		type: 'LIKE_JOB',
		id
	}
}

export const addLane = (name) => {
	return{
		type: 'ADD_LANE',
		id: nextLaneId++,
		name
	}
}

export const attachToLane = (laneId, jobId) => {

	return {
	    [CALL_API]: {
	        endpoint: '/wtf/',
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
	            'REQUEST',
	            {
	                type: 'ATTACH_TO_LANE',
	                payload: (action, state) => ({
						laneId: laneId,
						sourceId: jobId
	                })
	            },
	            'FAILURE'
	        ]
	    }
	};
}

/*
export const attachToLane = (laneId, jobId) => {
	return{
		type: 'ATTACH_TO_LANE',
		laneId,
		jobId
	}
}
*/

export const hover = (sourceId, targetId) => {

	return{
		type: 'HOVER',
		sourceId,
		targetId
	}
}


export const move = (sourceId, targetId) => {
	/*
	return{
		type: 'MOVE_SUCCESS',
		sourceId,
		targetId
	}
	*/

	return {
	    [CALL_API]: {
	        endpoint: '/wtf/',
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
					*/
	            },
	            'FAILURE'
	        ]
	    }
	};
}

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
	  jobSchema = new Schema('jobs', { idAttribute: 'job_id' });

// jobSchema = new Schema('jobs', { idAttribute: 'job_id' });


laneSchema.define({
	jobs: valuesOf(jobSchema)
});

export function getLanes() {
  return {
    [CALL_API]: {
        endpoint: '/wtf/',
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
                type: 'GET_LANES_SUCCESS',
                payload: (action, state, res) => {
                	let normal = getJSON(res).then((json) => normalize(json, { lanes: arrayOf(laneSchema) }));
                    return normal;
                }
            },
            'FAILURE'
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

