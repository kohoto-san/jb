import React from 'react'

import { connect } from 'react-redux'
import { Navbar } from '../components/navbar.js'

// import { likeJob } from '../actions/actions.js'
import { auth, getUser, loginPopupClose, contactsPopupClose, contactsPopupShow } from '../actions'

const mapStateToProps = (state) => {

	return{
		// jobs_count: state.jobs.filter(job => job.stage != 'no').length
		// jobs_count: state.entities.jobs.filter(job => job).length,
		jobs_count: state.entities.totalLikes,
		user: state.user,
		popupIsShow: state.loginPopup.isShow,
		contactsPopupIsShow: state.loginPopup.isShowContacts
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

		loginPopupClose: () => {
			dispatch( loginPopupClose() )
		},

		contactsPopupShow: () => {
			dispatch( contactsPopupShow() )
		},

		contactsPopupClose: () => {
			dispatch( contactsPopupClose() )
		}

	}
}


const VisibleNavbar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)

export default VisibleNavbar

// export default connect(mapStateToProps)(App);
