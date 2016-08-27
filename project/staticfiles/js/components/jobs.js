import React from 'react'
import ReactDOM from 'react-dom'
import ClassNames from 'classnames'
import $ from 'jquery'

// import { PropTypes } from 'react'
// import VisibleJobs from '../containers/jobs.js'
import { Link } from 'react-router'


// const Job = ({onLike, onDislike, job}) => (
// const Job = ({job, style, onLike}) => (
class Job extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLiked: this.props.isLiked
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return(
            this.props.style !== nextProps.style ||
            this.props.job !== nextProps.job ||
            this.state.isLiked !== nextState.isLiked
        );
    }

    render() {

        let likeClasses = ClassNames({
            'like': true,
            'is_liked': this.state.isLiked
        });

        return (
        	<div className="grid__item col s4" style={this.props.style}>

                {/*
                <Link to={{ pathname: `/job/${job.slug}` }} className="card hoverable z-depth-1">
                */}

        		<Link to={{ pathname: `/job/${this.props.job.slug}` }} className="card z-depth-1">
        			
                    <div className="card-body">
            			<p className="job-name center-align">{this.props.job.name}</p>
            	    	<p className="company-name center-align">{this.props.job.company}</p>

            	    	<div className="job-details">
            	    		<p className="left-align">{this.props.job.salary}</p>
            	    		<p className="right-align">{this.props.job.exp}</p>
            	    	</div>

            	    	<div className="job-keywords job-keys">
            	    		{this.props.job.keywords.map( keyword => (keyword['name']) ).join(', ')}
            	    	</div>
                    </div>

                    <div className="job-skills job-keys">
                        {this.props.job.skills.map(function(skill, index) {
                                return(<span key={skill.id}> {skill.name} </span>);
                            }
                        )}
                    </div>

                </Link> {/* .card*/}

        		<div className="job-actions">
                    {/* <a href="#" className="like"> */}
                    <a href="#" className={likeClasses} onClick={(e) => {
                            e.preventDefault();
                            if( localStorage.getItem('sagfi_token') ){
                                if(this.props.isLiked){
                                    // this.props.onDislike();
                                }
                                else{
                                    this.setState({ isLiked: true });
                                    this.props.onLike();
                                }
                            }
                            else{
                                this.props.loginPopupShow();
                            } 
                        }}>
                    	<i className="material-icons">&#xE87E;</i>  {/*favorite border*/}
                	</a> 
            	</div>
        	</div>
        );
    }
}


/**
 * Utility function for extending an object with other objects
 * @param {object} base - the object to extend
 * @param {array} ...args - the objects to do the extending
 * @returns {object} <base> extended
 */
export function extend(base, ...args) {
    args.forEach(arg => {
        if (arg && typeof arg === 'object') {
            Object.keys(arg || {}).forEach(key => {
                base[key] = arg[key];
            });
        }
    });
    return base;
}

class PinterestGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            styles: [],
            isRendered: false
        };
    }

    componentDidMount() {
        this.isLoading = true;
        if (this.props.children.length) {
            this.layout();
        }
    }

    componentDidUpdate() {
        this.layout();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children.length ||
            (this.props.children.length !== nextProps.children.length) ||
            (this.state.styles.length !== nextState.styles.length)
        );
    }

    /**
     * Build a style attribute based on passed in styles
     * and the opacity signifying readiness
     * @returns {object} style key/value map
     */
    getStyle() {
        return extend({
            opacity: this.state.styles.length ? 1 : 0
        }, this.props.style);
    }

    /**
     * Find which column is the shortest
     * @param {array} a list of column heights
     * @returns {number} the index of the column to use
     */
    getShortestColumn(columns) {
        const shortest = columns.reduce((smallest, columnHeight) => {
            return columnHeight < smallest ? columnHeight : smallest;
        });
        return columns.indexOf(shortest);
    }

    /**
     * Look at the root node and/or its parent, and determine
     * how many columns we can fit.
     * @returns {number} the number of columns to use
     */
    getColumnCount() {
        if (this.props.columns) {
            return this.props.columns;
        } else {
            const rootNode = ReactDOM.findDOMNode(this);
            const rootWidth = rootNode.offsetWidth || rootNode.parentNode.offsetWidth;
            // const childNode = rootNode.children[0].firstChild;
            const childNode = rootNode.children[0].firstChild;
            const childWidth = childNode.offsetWidth;
            return Math.floor(rootWidth / (childWidth + this.props.gutter));
        }
    }

    /**
     * Wait for children to render, and then determine each element's
     * absolute positioning within the grid
     * @returns {Promise}
     */
    layout() {

        if( ! this.state.isRendered){
            this.waitForChildren().then(() => {
                const columnCount = this.getColumnCount();
                if(columnCount){

                    const gutter = this.props.gutter;
                    // const nodeWidth = ReactDOM.findDOMNode(this.refs['child-0']).offsetWidth;
                    const nodeWidth = ReactDOM.findDOMNode(this).children[0].firstChild.offsetWidth;
                    
                    let columnHeights = Array.apply(null, Array(columnCount)).map(x => 0);
                    const styles = this.props.children.map((child, i) => {
                        const node = ReactDOM.findDOMNode(this).children[i].firstChild;
                        const columnIndex = this.getShortestColumn(columnHeights);
                        const top = columnHeights[columnIndex];
                        const left = columnIndex * (nodeWidth + gutter);
                        columnHeights[columnIndex] += node.offsetHeight + gutter;

                        return {
                            position: 'absolute',
                            top: `${top}px`,
                            left: `${left}px`
                        };
                    });
                    this.setState({ styles: styles, isRendered: true });
                }
            });
        }
    }

    /**
     * Wait for all children to have been rendered
     * @returns {Promise}
     */

    waitForChildren() {
        
        return new Promise(resolve => {
            this.interval = setInterval(() => {
                const ready = this.props.children.every((child, i) => {
                    const node = ReactDOM.findDOMNode(this).children[i].firstChild;
                    return node;
                    // return ReactDOM.findDOMNode(this.refs[`child-${i}`]);
                });

                if (ready) {
                    clearInterval(this.interval);
                    resolve();
                }
            }, 50);
        });
    }

    /**
     * Build out the child nodes with the additional style and ref attributes
     * @returns {array} a list of ready-to-render child nodes
     */
    getUpdatedChildren() {
        return React.Children.map(this.props.children, (child, i) => {

            const style = child.props.style || {};

            let newChild = React.cloneElement(child, {
                style: extend({}, this.state.styles[i], child.props.style),
                // style: {position: 'absolute'},
                // ref: `child-${i}`,
            });

            this.isLoading = false;
            return newChild;
        });
    }

    /**
     * Render the children absolutely positioned within parent
     */
    render() {
        // <div ref="root" className="pinterest-grid">
        
        let content;
        content = this.getUpdatedChildren();

        /*
        if(this.isLoading){

            content = (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            )

        }
        else{
        }
        */

        return (
            <div id="grid" className="autogrid job_list grid row">
                { content }
            </div>
        );
    }

}

PinterestGrid.propTypes = {
    gutter: React.PropTypes.number
};

PinterestGrid.defaultProps = {
    gutter: 0
};





// const Jobs = ({ jobs }) => (
class JobList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            isLoaded: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return(
            this.state.jobs !== nextState.jobs ||
            !this.state.isLoaded
        );

        // return !this.state.isLoaded;
    }

	componentDidMount() {
        // this.props.getJobs();

        $.ajax({
            url: '/jobs/',
            dataType: 'json',
            cache: false,
            success: function(jobs) {
                this.setState({jobs: jobs});
                this.setState({isLoaded: true});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
	}

	items (){
        // return this.props.jobs.map((job, i) =>{
        return this.state.jobs.map((job, i) =>{

            const isLiked = this.props.likes.has(job.id)

		   	return(<Job
		        key={job.id}
		        job={job}
                isLiked={isLiked}
                // ref={`child-${i}`}
                onLike={() => this.props.onLike(job.id) }
		        onDislike={() => this.props.onDislike(job.id)}
                loginPopupShow={() => this.props.loginPopupShow() }
		    />)
	    })
	}

	render() {
        if(this.state.isLoaded){
    		return (
    			<div className="container">

                    {/*
                    <div id="grid" className="job_list grid row">
                        { this.items() }
                    </div>
                    */}

                    <PinterestGrid gutter={20}>
                        { this.items() }
                    </PinterestGrid>
    			</div>				
    		);
        }
        else{
            return(
                <div style={{textAlign: 'center'}}>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
