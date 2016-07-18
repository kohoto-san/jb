import React from 'react'

import { connect } from 'react-redux'
import { JobList } from '../components/jobs.js'

import { likeJob, getJobs } from '../actions/actions.js'

const mapStateToProps = (state) => {
	return{
		jobs: state.allJobs
		// jobs: ownProps.params.jobs
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLike: (id) => {
			dispatch(likeJob(id))
		},

		getJobs: () => {
			dispatch(getJobs())
		}
	}
}


const VisibleJobs = connect(
	mapStateToProps,
	mapDispatchToProps
)(JobList)

export default VisibleJobs

// export default connect(mapStateToProps)(App);
