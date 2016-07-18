import React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component{
	render() {
		return (
			<div>

				<Link to="/my-jobs" className="my-jobs">
					<p>
						My Jobs
						<span id="jobs-counter"> {this.props.jobs_count}</span>		
					</p>
				</Link>

			</div>
		);
	}
}

export {Navbar}
