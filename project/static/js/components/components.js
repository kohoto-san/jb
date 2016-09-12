import React from 'react'
import VisibleNavbar from '../containers/navbar.js'


class App extends React.Component{

	render() {

		return (
			<div>
				<VisibleNavbar />
				{this.props.children}
			</div>
		);
	}

}

export { App }
