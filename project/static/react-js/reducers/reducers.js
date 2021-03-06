import { combineReducers } from 'redux'
import update from 'react-addons-update'
import merge from 'lodash/merge'

import * as types from '../constants/ActionTypes';


function loginPopup(state={isShow: false, isAuthProcess: false, isShowContacts: false}, action){
    switch(action.type){
        case 'LOGIN_POPUP_SHOW':
            return { isShow: true, isAuthProcess: state.isAuthProcess, isShowContacts: false }

        case 'LOGIN_POPUP_CLOSE':
            return { isShow: false, isAuthProcess: state.isAuthProcess, isShowContacts: false }

        case 'AUTH_REQUEST':
            return { isShow: false, isAuthProcess: true, isShowContacts: false }

        case 'CONTACTS_POPUP_SHOW':
            return { isShow: false, isAuthProcess: false, isShowContacts: true }

        case 'CONTACTS_POPUP_CLOSE':
            return { isShow: false, isAuthProcess: false, isShowContacts: false }

        default:
            return state
    }
}

// const isAuth = localStorage.getItem('sagfi_token') ? true : false;
// function user( state={isAuth: false, first_name: ''}, action){
function user(state={}, action){
    switch(action.type){

        case types.GET_USER_SUCCESS:
            // console.log('               ')
            // console.log(action)
            // console.log('               ')
            return Object.assign({}, state, {
                first_name: action.payload.first_name,
                isAuth: true
            })

        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuth: true
            })

        case types.LOGOUT:
            return Object.assign({}, state, {
                isAuth: false
            })

        default:
            return state

    }
}




// const jobs = (state=[], action) => {
function jobs1 (state=[], action){
    switch(action.type){
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
            return[
                ...state,
                {
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
            ]

        case 'LIKE_JOB':
            return state.map(job => 
                job.id === action.id ?
                Object.assign({}, job, {stage: 'like'}) :
                job
            )
        

        default:
            return state
    }
}

function lanesOld(state=[], action){
    switch(action.type){

        case 'ADD_LANE':
            return[
                 ...state,
                {
                    id: action.id,
                    name: action.name,
                    jobs: []
                }
            ]

        case 'ATTACH_TO_LANE':
            return state.map(lane => {
                
                if(lane.jobs.includes(action.jobId)) {
                    lane.jobs = lane.jobs.filter(job => job !== action.jobId);
                }

                // if(lane.id === action.laneId && !lane.jobs.includes(action.jobId)){
                if(lane.id === action.laneId){
                    lane.jobs = [...lane.jobs, action.jobId]
                }

                return lane
            })

        case 'MOVE':
            const lanes = state
            // console.log('=========STATE==========')
            // console.log(state[0].jobs)
            const sourceLane = lanes.filter(lane => lane.jobs.includes(action.sourceId))[0]
            const targetLane = lanes.filter(lane => lane.jobs.includes(action.targetId))[0]
            const sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId)
            const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)

            let newSourceLane
            let newTargetLane
            let newLane

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

            const logging = {sourceId: action.sourceId, targetId: action.targetId, name: sourceLane.name,
                             sourceLane: sourceLane.id, targetLane: targetLane.id}
            // console.log(logging)

            return state.map(lane => {
                if(lane.id === sourceLane.id)
                    return newSourceLane
                else if(lane.id === targetLane.id)
                    return newTargetLane
                else
                    return lane
            })

        default:
            return state

    }
}


function move (state, action) {
    const lanes = state.lanes

    // console.log(action)

    const sourceLane = lanes.filter(lane => lane && lane.jobs && lane.jobs.includes(action.sourceId) )[0]
    const targetLane = lanes.filter(lane => lane && lane.jobs && lane.jobs.includes(action.targetId) )[0]
    
    // console.log('!!!!!!!!!!!1')
    // console.log(sourceLane)
    // console.log(targetLane)

    const sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId)
    const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)

    let newSourceLane
    let newTargetLane
    let newLane

    const sourceJob = state.jobs.filter(job => job && job.id == action.sourceId)[0]
    const targetJob = state.jobs.filter(job => job && job.id == action.targetId)[0]
    
    const sourcePosition = sourceJob.position
    const targetPosition = targetJob.position

    // const ids = new Set(sourceLane.jobs)
    // const currentJobs = new Set([sourceJob.id, targetJob.id])

    let newJobs = state.jobs.map(job => {
        if(job && job.id == sourceJob.id){
            return update(job, {
                position: {$set: targetPosition}
            })
        }
        else if (job && job.id == targetJob.id){
            return update(job, {
                position: {$set: sourcePosition}
            })
        }
        else{
            return job
        }
    })

    let newLanes

    if(sourceLane != targetLane) {

        newLanes = state.lanes.map(lane => {
            if( lane && sourceLane.id === lane.id ){
                return update(lane, {
                    jobs: {
                        $splice: [
                            [sourceNoteIndex, 1]
                        ]
                    }
                });
            }
            else if ( lane && targetLane.id === lane.id ){
                return update(lane, {
                    jobs: {
                        $splice: [
                            [targetNoteIndex, 0, action.sourceId]
                        ]
                    }
                });
            }
            else{
                return lane;
            }
        })
    }

    const newState = {
        lanes: newLanes ? newLanes : state.lanes,
        jobs: newJobs
    }

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


function attachToLane(state, action){
    const lanes = state.lanes

    const targetLane = lanes.filter(lane => lane && lane.id == action.targetLaneId)[0]
    const sourceLane = lanes.filter(lane => lane && lane.jobs && lane.jobs.includes(action.jobId))[0]
    
    // if(!sourceLane){
    //     sourceLane = lanes.filter(lane => lane && lane.id == action.sourceLaneId)[0]
    // }
    
    // const sourceLane = lanes.filter(lane => lane && lane.id == action.sourceLaneId)[0]
    // console.log(  lanes.filter(lane => lane && lane.jobs && lane.jobs.includes(action.jobId))  )

    const sourceNoteIndex = sourceLane.jobs.indexOf(action.jobId)
    const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)

    const sourceJob = state.jobs.filter(job => { if(job) return job.id == action.jobId })[0]

    let newSourceLane
    let newTargetLane
    let newLane

    
    // const targetPosition = 0
    const targetPosition = targetLane.jobs.length
    // console.log(targetPosition)


    // const ids = new Set(sourceLane.jobs)
    // const currentJobs = new Set([sourceJob.id, targetJob.id])

    // console.log(sourceJob)
    // console.log('jobId ' + sourceJob.id)

    let newJobs = state.jobs.map(job => {
        if(job && job.id == sourceJob.id){
            return update(job, {
                position: {$set: targetPosition},
                lane_id: {$set: action.targetLaneId}
            })
        }
        else{
            return job
        }
    })

    let newLanes
    // if(sourceLane != targetLane) {

    newLanes = state.lanes.map(lane => {

        if( lane && sourceLane.id === lane.id && lane.jobs){
            return update(lane, {
                jobs: {
                    $splice: [
                        [sourceNoteIndex, 1]
                    ]
                }
            });
        }
        else if ( lane && targetLane.id === lane.id && lane.jobs){
            return update(lane, {
                jobs: {
                    $splice: [
                        [targetNoteIndex, 0, action.jobId]
                    ]
                }
            });
        }
        else{
            return lane;
        }
    })
    // }

    const newState = {
        lanes: newLanes ? newLanes : state.lanes,
        jobs: newJobs,
        totalLikes: state.totalLikes
    }

    return newState;
}


function likeJob(state, action){
    const lanes = state.lanes

    const targetLane = lanes.filter(lane => lane && lane.id == action.laneId)[0]
    const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)
    const sourceJob = state.jobs.filter(job => job && job.id == action.sourceId)[0]

    let newLane
    const targetPosition = 0

    let newJobs = [
        ...state.jobs,
        action.metajob
    ]

    /*
    let newJobs = state.jobs.map(job => {

        // if(job.id == sourceJob.id){
        if(job && job.id == action.sourceId){
            return update(job, {
                position: {$set: targetPosition}
            })
        }
        else{
            return job
        }
    })
    */

    let newLanes
    // if(sourceLane != targetLane) {

    newLanes = state.lanes.map(lane => {
    
        if ( lane && targetLane.id === lane.id && lane.jobs){
            return update(lane, {
                jobs: {
                    $splice: [
                        [targetNoteIndex, 0, action.sourceId]
                    ]
                }
            });
        }
        else{
            return lane;
        }
    })
    // }



    const newState = {
        lanes: newLanes ? newLanes : state.lanes,
        jobs: newJobs,
        totalLikes: state.totalLikes
    }

    return newState;
}


function dislikeJob(state, action){
    const lanes = state.lanes

    console.log(action)
    const sourceLane = lanes.filter(lane => lane && lane.jobs && lane.jobs.includes(action.jobId))[0]
    const sourceJobNoteIndex = sourceLane.jobs.indexOf(action.jobId)
    const sourceJob = state.jobs.filter(job => { if(job) return job.id == action.jobId })[0]

    let newLane
    const targetPosition = 0

    let newJobs = update(state.jobs, {
        $splice: [
            [sourceJobNoteIndex, 1]
        ]
    });

    let newLanes;
    newLanes = state.lanes.map(lane => {

        if( lane && sourceLane.id === lane.id && lane.jobs){
            return update(lane, {
                jobs: {
                    $splice: [
                        [sourceJobNoteIndex, 1]
                    ]
                }
            });
        }
        else{
            return lane;
        }
    })

    const newState = {
        lanes: newLanes,
        jobs: newJobs,
        totalLikes: state.totalLikes
    }

    return newState;
} // dislikeJob()

function entities(state = { lanes: [], jobs: [], totalLikes: 0 }, action) {
    if (action.response && action.response.entities) {
        // alert('fuck you')
        return merge({}, state, action.response.entities)
    }

    switch(action.type){
        case "GET_LANES_SUCCESS":

            let totalLikes;
            if(action.payload.entities.jobs){
                totalLikes = Object.keys(action.payload.entities.jobs).length;
            }
            else{
                totalLikes = 0;
            }

            let newState = {
                lanes: action.payload.entities.lanes,
                jobs: action.payload.entities.jobs,
                totalLikes: totalLikes
            }
            return merge({}, state, newState)
            // return merge({}, state, action.payload.entities)

        /*
        case 'MOVE_SUCCESS':
            return move(state, action)
            // return move(state, action.payload)
        */  


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
            return attachToLane(state, action)
            // return attachToLane(state, action.payload)

        case 'LIKE_JOB_REQUEST':
            return {
                lanes: state.lanes,
                jobs: state.jobs, 
                totalLikes: state.totalLikes + 1
            }

        case 'DISLIKE_JOB_REQUEST':
            return {
                lanes: state.lanes,
                jobs: state.jobs, 
                totalLikes: state.totalLikes - 1
            }

        case 'LIKE_SUCCESS':
            return likeJob(state, action.payload)

        case 'DISLIKE_JOB_SUCCESS':
            return dislikeJob(state, action.payload)

        /*
        case 'DISLIKE_SUCCESS':
            return dislikeJob(state, action.payload)
        */

        default:
            return state
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


function allJobs(state=[], action){
    if(action.type == "GET_JOBS_SUCCESS"){
        return merge([], state, action.payload)
    }

    return state
}









export {entities, allJobs, user, loginPopup}



















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

