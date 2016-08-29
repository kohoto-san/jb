import React from 'react'

import { connect } from 'react-redux'
import { Navbar } from '../components/navbar.js'

// import { likeJob } from '../actions/actions.js'
import { auth, getUser, loginPopup, loginPopupClose } from '../actions'

const mapStateToProps = (state) => {

	return{
		// jobs_count: state.jobs.filter(job => job.stage != 'no').length
		// jobs_count: state.entities.jobs.filter(job => job).length,
		jobs_count: state.entities.totalLikes,
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
		},

		loginPopupClose: () => {
			dispatch( loginPopupClose() )
		}

	}
}


const VisibleNavbar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)

export default VisibleNavbar

// export default connect(mapStateToProps)(App);
