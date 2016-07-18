import React from 'react'
// import { PropTypes } from 'react'
// import VisibleJobs from '../containers/jobs.js'


const Job = ({onLike, onDislike, job}) => (

	<div className="grid__item col s4">
		<div className="card z-depth-1">
			
			<p className="job-name center-align">{job.name}</p>
	    	<p className="company-name center-align">{job.company}</p>

	    	<div className="job-details">
	    		<p className="left-align">{job.salary}</p>
	    		<p className="right-align">{job.exp}</p>
	    	</div>

				{/*
	    	<div className="job-keywords job-keys">
	    		{job.keywords.split(',').map(keyword => {
	    				return(keyword + ', ')
		    		}
	    		)}
	    	</div>
	
	    	<div className="job-skills job-keys">
				{/*
	    		{job.skills.map(skill => {
	    			return(<span key={skill} >{skill}</span>)
	    			}
	    		)}

				{job.skills}

	    	</div>
				*/}

	    	<div className="job-actions">
	            
	            <a href="#" className="like" onClick={onLike}>
	            	<i className="material-icons">&#xE87E;</i>  {/*favorite border*/}
	        	</a> 

				<a href="#" className="dislike">
	        		<i className="material-icons">&#xE5CD;</i> {/*close*/}
	    		</a>
	    	</div>

		</div>
	</div>
)

// const Jobs = ({ jobs }) => (
class JobList extends React.Component{

	componentDidMount() {
        this.props.getJobs();
	}

	render() {
		// alert(JSON.stringify(this.props.jobs, null, 4));

		return (

			<div className="container">
				<div id="grid" className="job_list grid row">
				
                	{this.props.jobs.map(job =>{
				      
						// alert(JSON.stringify(job, null, 4));


				       return(<Job
				        key={job.id}
				        job={job}
				        onLike={() => this.props.onLike(job.id)}
				        />)

				       }


				    )}

				</div>
			</div>				

		);
	}
}
// )

export {JobList}

/*
class Home extends React.Component{	

	render() {
		const { jobs } = this.props

		return (
			<div>
				<JobList jobs={this.props.jobs} />

				{jobs}

			</div>
		);
	}

}
*/



// Home.PropTypes = {
// 	jobs: PropTypes.arrayOf(PropTypes.shape({
// 	    name: PropTypes.string.isRequired
// 	}).isRequired).isRequired
// }

