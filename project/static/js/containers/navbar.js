import React from 'react'

import { connect } from 'react-redux'
import { Navbar } from '../components/navbar.js'

// import { likeJob } from '../actions/actions.js'
import { auth, getUser, loginPopup } from '../actions'

const mapStateToProps = (state) => {

	return{
		// jobs_count: state.jobs.filter(job => job.stage != 'no').length
		jobs_count: state.entities.jobs.filter(job => job).length,
		user: state.user,
		popupIsShow: state.loginPopup.isShow
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		/*
		onLike: (id) => {
			dispatch(likeJob(id))
		},
		*/

		auth: () => {
			dispatch(auth())
		},

		getUser: () => {
			dispatch(getUser())
		},

		loginPopup: (step) => {
			dispatch( loginPopup(step) )
		}

	}
}


const VisibleNavbar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)

export default VisibleNavbar

// export default connect(mapStateToProps)(App);
