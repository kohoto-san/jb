import React from 'react'

import { connect } from 'react-redux'
import { JobList } from '../components/jobs.js'

import { likeJob, getJobs, loginPopupShow, dislikeJob } from '../actions'

const mapStateToProps = (state) => {

    // const likes_arr = state.entities.jobs.map(job => { if(job) return job.job_id })
    const likes_arr = state.entities.jobs.map(job => { if(job) return job })
    const likes = new Set(likes_arr);

	return{
		likes: likes_arr
		// jobs: state.allJobs,
		// jobs: ownProps.params.jobs
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLike: (jobId) => {
			dispatch(likeJob(jobId))
		},

		onDislike: (jobId) => {
			dispatch(dislikeJob(jobId))
		},

		getJobs: () => {
			dispatch(getJobs())
		},

		loginPopupShow: () => {
			dispatch( loginPopupShow() )
		},

		onDislike: (jobId) => {
            dispatch( dislikeJob(jobId) )
        }
	}
}


const VisibleJobs = connect(
	mapStateToProps,
	mapDispatchToProps
)(JobList)

export default VisibleJobs

// export default connect(mapStateToProps)(App);
