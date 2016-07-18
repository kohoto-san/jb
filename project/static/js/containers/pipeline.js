import React from 'react'

import { connect } from 'react-redux'
import {Pipeline, Lane} from '../components/pipeline.js'

import { move, attachToLane, getLanes } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return{
        entities: state.entities
        // jobs: state.entities.jobs,
        // lanes: state.entities.lanes
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onMove: (sourceId, targetId) => {
            dispatch(move(sourceId, targetId))
        },

        attachToLane: (laneId, jobId) => {
            dispatch(attachToLane(laneId, jobId))
        },

        getLanes: () => {
            dispatch(getLanes())
        }
    }
}

const VisiblePipeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(Pipeline)

/*
const VisibleJob = connect(
    mapDispatchToProps
)(Lane)
*/

export {VisiblePipeline}
