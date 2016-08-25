import React from 'react'

import { connect } from 'react-redux'
import {Pipeline, Lane} from '../components/pipeline.js'

import { move, attachToLane, getLanes, loginPopupShow } from '../actions'

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

        attachToLane: (targetLaneId, sourceLaneId, sourceJobId) => {
            dispatch(attachToLane(targetLaneId, sourceLaneId, sourceJobId))
        },

        getLanes: () => {
            dispatch(getLanes())
        },

        loginPopupShow: () => {
            dispatch( loginPopupShow() )
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
