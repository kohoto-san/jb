import { combineReducers } from 'redux'
import update from 'react-addons-update'
import merge from 'lodash/merge'


const initialState = [
    {
        name: 'Fuck you Job',
        company: 'Google',
        salary: '100k',
        exp: 'Middle',
        keywords: ['html', 'css', 'js']
    }
]

// const initialState = ['fuck you']

const initState = {
    initJobs: [],
    likeJobs: []
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

    const sourceLane = lanes.filter(lane => lane.jobs && lane.jobs.includes(action.sourceId))[0]
    const targetLane = lanes.filter(lane => lane.jobs && lane.jobs.includes(action.targetId))[0]
    const sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId)
    const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)

    let newSourceLane
    let newTargetLane
    let newLane

    const sourceJob = state.jobs.filter(job => job.id == action.sourceId)[0]
    const targetJob = state.jobs.filter(job => job.id == action.targetId)[0]
    
    const sourcePosition = sourceJob.position
    const targetPosition = targetJob.position

    // const ids = new Set(sourceLane.jobs)
    // const currentJobs = new Set([sourceJob.id, targetJob.id])

    let newJobs = state.jobs.map(job => {
        if(job.id == sourceJob.id){
            return update(job, {
                position: {$set: targetPosition}
            })
        }
        else if (job.id == targetJob.id){
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
            if( sourceLane.id === lane.id ){
                return update(lane, {
                    jobs: {
                        $splice: [
                            [sourceNoteIndex, 1]
                        ]
                    }
                });
            }
            else if ( targetLane.id === lane.id ){
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

    const targetLane = lanes.filter(lane => lane.id == action.laneId)[0]
    const sourceLane = lanes.filter(lane => lane.jobs && lane.jobs.includes(action.sourceId))[0]

    const sourceNoteIndex = sourceLane.jobs.indexOf(action.sourceId)
    const targetNoteIndex = targetLane.jobs.indexOf(action.targetId)

    const sourceJob = state.jobs.filter(job => job.id == action.sourceId)[0]

    let newSourceLane
    let newTargetLane
    let newLane

    
    const targetPosition = 0

    // const ids = new Set(sourceLane.jobs)
    // const currentJobs = new Set([sourceJob.id, targetJob.id])

    let newJobs = state.jobs.map(job => {
        if(job.id == sourceJob.id){
            return update(job, {
                position: {$set: targetPosition}
            })
        }
        else{
            return job
        }
    })

    let newLanes
    // if(sourceLane != targetLane) {

        newLanes = state.lanes.map(lane => {
            if( sourceLane.id === lane.id && lane.jobs){
                return update(lane, {
                    jobs: {
                        $splice: [
                            [sourceNoteIndex, 1]
                        ]
                    }
                });
            }
            else if ( targetLane.id === lane.id && lane.jobs){
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
        jobs: newJobs
    }

    return newState;
}


function entities(state = { lanes: [], jobs: [] }, action) {
    if (action.response && action.response.entities) {
        // alert('fuck you')
        return merge({}, state, action.response.entities)
    }

    switch(action.type){
        case "GET_LANES_SUCCESS":
            return merge({}, state, action.payload.entities)

         case 'MOVE_SUCCESS':
            return move(state, action.payload)
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
            return attachToLane(state, action.payload)
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

export {entities, allJobs}

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

