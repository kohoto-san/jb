// import { PropTypes } from 'react'
import React from 'react'
import { Link, browserHistory } from 'react-router'

import { compose } from 'redux'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {VisibleJob} from '../containers/pipeline.js'


const jobSource = {
	beginDrag(props){
		return{
			jobId: props.job.job_id,
			id: props.id,
			laneId: props.job.lane_id
		};
	},

	isDragging(props, monitor) {
	    return props.id === monitor.getItem().id;
	},
};

const jobTarget = {
	/*
	hover(targetProps, monitor) {
		const targetId = targetProps.id;
	    const sourceId = monitor.getItem().id;

	    if(sourceId !== targetId) {
			targetProps.onHover(sourceId, targetId);
	    }
	}
	*/

	hover(targetProps, monitor) {
		const targetId = targetProps.job.id;
	    const sourceId = monitor.getItem().id;

	    // Don't replace items with themselves
	    if (targetId !== sourceId) {
			targetProps.onMove(sourceId, targetId);
	    }
	}

	/*
	drop(targetProps, monitor) {
		const targetId = targetProps.job.id;
	    const sourceId = monitor.getItem().id;

	    // Don't replace items with themselves
	    if (targetId !== sourceId) {
			targetProps.onMove(sourceId, targetId);
	    }

	}
	*/
};

@DragSource('job', jobSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
@DropTarget('job', jobTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
}))
class Job extends React.Component{

	shouldComponentUpdate(nextProps, nextState) {
        return(
            this.props.connectDragSource !== nextProps.connectDragSource ||
            this.props.connectDropTarget !== nextProps.connectDropTarget ||
            this.props.isDragging !== nextProps.isDragging ||
            this.props.isOver !== nextProps.isOver ||
            this.props.job !== nextProps.job
        );
    }

    click(){
    	browserHistory.push(`/job/${this.props.job.job__slug}`);
    }

	render() {
		const { connectDragSource, connectDropTarget, isDragging, isOver } = this.props;

		// console.log('isDragging ' + isDragging)

		// return connectDragSource(connectDropTarget(
		return connectDragSource(
			<div className="job" style={{opacity: isDragging || isOver ? 0 : 1}}>
			{/*
			<div className="job col s12" style={{opacity: isDragging || isOver ? 0.2 : 1}}>
			

			<Link to={{ pathname: `/job/${this.props.job.job__slug}` }} className="card z-depth-1">
			*/}

				<a href="#" className="card z-depth-1" onClick={(e) => {
                    e.preventDefault();
                    this.click();
                }}>
					
					<p className="job-name">{this.props.job.job__name}</p>
			    	<p className="company-name">{this.props.job.job__company}</p>

			    	{/*
			    	<div className="job-details">
			    		<p className="left-align">{this.props.job.job__salary}</p>
			    		<p className="right-align">{this.props.job.job__exp}</p>
			    	</div>
			    	*/}

				</a>
			</div>
		);
	}
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const laneTarget = {
	/*
	drop(targetProps, monitor) {
	    const sourceId = monitor.getItem().id;

	    // If the target lane doesn't have notes, attach the note to it.
	    //
	    // `attachToLane` performs necessarly cleanup by default and it guarantees
	    // a note can belong only to a single lane at a time.
	    
	    // if length == 0
	    if( ! targetProps.lane.jobs.length) {
			targetProps.attachToLane(
				targetProps.lane.id,
				sourceId
			);
	    }
	}
	*/

	hover(targetProps, monitor) {
		const sourceJobId = monitor.getItem().id;
		const sourceLaneId = monitor.getItem().laneId;
		const targetLaneId = targetProps.lane.id;

		let laneHasJob = targetProps.lane.jobs.includes(sourceJobId)
		// console.log(laneHasJob)

	    // if( ! targetProps.lane.jobs.length) {
	    if( !laneHasJob && sourceLaneId !== targetLaneId ) {
	    	// console.log(' IFFFIFIFIIF ')
	    	// console.log(sourceLaneId)
	    	// console.log(monitor.getItem())
	    	// console.log(sourceLaneId + '  ---  ' + targetLaneId)
			targetProps.attachToLane(
				targetLaneId,
				sourceLaneId,
				sourceJobId
			);
	    }

	}
}

@DropTarget('job', laneTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
class Lane extends React.Component{

	shouldComponentUpdate(nextProps, nextState) {
        return(
            this.props.connectDropTarget !== nextProps.connectDropTarget ||
            this.props.jobs !== nextProps.jobs ||
            this.props.lane !== nextProps.lane
        );
    }


	render() {

		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div className="lane col">

				<div className="lane-content">
					<div className="header center-align">
						<p className="card z-depth-1 ">
							{this.props.lane.name}
						</p>
					</div>

					{this.props.jobs.map(job =>{
							return(
								<Job
									id={job.id}
									key={job.id}
									job={job}
									// onFuck={ ({sourceId, targetId}) =>{return true}
							            // console.log(`source: ${sourceId}, target: ${targetId}`)
							        // }
							        onMove={ (sourceId, targetId) => this.props.onMove(sourceId, targetId) }
								/>
							)
					})}
				</div>
			</div>
		);
	}
}


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

function selectJobsByIds(allJobs, jobsIds = []) {

    const ids = new Set(jobsIds);

    let selectJobs = allJobs.filter( (job) =>{
    					if(job){
    					 	return ids.has(job.id)
    					}
					}).sort(
					    (a, b) => a.position - b.position
					)

	return(selectJobs)

/*
	let selectJobs = jobsIds.reduce((jobs, id) =>
		jobs.concat(
			allJobs.filter(job => {
				if(job)	return job.id === id
			})
		), []);
*/
}

@DragDropContext(HTML5Backend)
class Pipeline extends React.Component{
	componentDidMount() {
        if( localStorage.getItem('sagfi_token') ){
	        this.props.getLanes();
		}
		else{
			this.props.loginPopupShow();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
        return(
            this.props.entities !== nextProps.entities
        );
    }

	renderLanes(){
		if(this.props.entities.jobs.length){
			return this.props.entities.lanes.map(lane => {

				if(lane){
					return(
						<Lane 
							key={lane['name']}
							lane={lane}
							jobs={selectJobsByIds(this.props.entities.jobs, lane.jobs)}
							onMove={ (sourceId, targetId) => this.props.onMove(sourceId, targetId) }
							attachToLane={ (targetLaneId, sourceLaneId, sourceJobId) => this.props.attachToLane(targetLaneId, sourceLaneId, sourceJobId) }
						/>
					)
				}
			})
		}
		else{
			return(
				<p>No jobs yet.</p>
			)
		}
	}

	render() {
		// alert(JSON.stringify(this.props.entities, null, 4));

		return (
			<div id="grid" className="grid row">
				{/*
				<div className="col s10 offset-s1">
					{this.renderLanes()}
				</div>
				*/}
					{this.renderLanes()}
			</div>
		);
	}
}

export {Pipeline, Lane}
