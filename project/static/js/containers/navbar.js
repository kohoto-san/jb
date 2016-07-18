import React from 'react'

import { connect } from 'react-redux'
import { Navbar } from '../components/navbar.js'

// import { likeJob } from '../actions/actions.js'

const mapStateToProps = (state) => {
	return{
		// jobs_count: state.jobs.filter(job => job.stage != 'no').length
		jobs_count: 0
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLike: (id) => {
			dispatch(likeJob(id))
		}
	}
}


const VisibleNavbar = connect(
	mapStateToProps
)(Navbar)

export default VisibleNavbar

// export default connect(mapStateToProps)(App);
