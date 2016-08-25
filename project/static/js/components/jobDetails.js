import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import $ from 'jquery'

class JobDetails extends React.Component{

	constructor(props){
        super(props);

        this.state = {
            job: [],
            keywords: [],
            skills: []
        }

        // this.changeActiveClient = this.changeActiveClient.bind(this);
    }

	componentDidMount() {
		
		let id = this.props.slug.split('-')[0]

		$.ajax({
			url: `/api/job/${id}`,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({job: data});
				this.setState({keywords: data.keywords});
				this.setState({skills: data.skills});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
	    });

	}


	
	share(e, href){

		e.preventDefault();

            let width  = 575,
                height = 400,
                left   = ($(window).width()  - width)  / 2,
                top    = ($(window).height() - height) / 2,
                opts   = 'status=1' +
                         ',width='  + width  +
                         ',height=' + height +
                         ',top='    + top    +
                         ',left='   + left;

            let url;

            if(href.includes('twitter')){
                url = href + this.state.job.name + ' at ' + this.state.job.company;
            }
            else{
	            url = href + window.location.href;
            }

            window.open(url, 'sharing', opts);
 
            return false;
	}

	renderText() {
		return {__html: this.state.job.text};
	};
	
	render() {

		return (

			<div className="container">
				<div id="grid" className="full-job grid row">

					<div className="col s12 l10 offset-l1" style={{width: '700px'}}>
						<div className="card">
							<div className="card-content">

								<h1 className="job-name center-align">{this.state.job.name}</h1>
								<span className="job-company card-title center-align">{this.state.job.company}</span>
								
								<div className="job-details">
				    	    		<p className="left-align">{this.state.job.salary}</p>
				    	    		<p className="right-align">{this.state.job.exp}</p>
				    	    	</div>

								<div className="job-text" dangerouslySetInnerHTML={ this.renderText() }></div>

							</div>
						</div>

						<div className="card">
							<div className="card-content">
								<div className="job-keywords">
									{this.state.keywords.map( keyword => (keyword['name']) ).join(', ')}
								</div>


								<div className="job-skills">
									{this.state.skills.map(function(skill, index) {
					                        return(<span key={skill.id}> {skill.name} </span>);
					                    }
					                )}
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card-content share-btns-wrapper">
								<span>Share</span>

				                <a onClick={(e) => this.share(e, `http://twitter.com/share?text=` )} href='#' target="_blank">
				                    <i className="fa fa-twitter" aria-hidden="true"></i>
				                    {/* Twitter */}
				                </a>
				            
				                <a onClick={(e) => this.share(e, 'https://www.facebook.com/sharer/sharer.php?u=')} href="#" target="_blank">
				                	<i className="fa fa-facebook" aria-hidden="true"></i>
				                	{/* Facebook */}
				                </a>


								{/*
								<a class="vk popup" href="http://vk.com/share.php?url=" target="_blank">
				                    <i class="fa fa-vk fa-2x"></i>
				                </a>
				            
				                <a class="twitter popup" href="http://twitter.com/share?text={{post.title}}" target="_blank">
				                    <i class="fa fa-twitter fa-2x"></i>
				                </a>
				            
				                <a class="facebook popup" href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank">
				                    <i class="fa fa-facebook fa-2x"></i>
				                </a>
				                */}

							</div>
						</div>

						<a className="btn-apply waves-effect btn" href={this.state.job.url} target="_blank">Apply</a>

						<a className="btn-like waves-effect btn" href="#" onClick={(e) => {
                            e.preventDefault();
                            if( localStorage.getItem('sagfi_token') ){
                                this.props.onLike(this.state.job.id);
                               
                                /*
                                if(this.props.isLiked){
                                    // this.props.onDislike();
                                }
                                else{
                                    // this.setState({ isLiked: true });
                                    this.props.onLike();
                                }
                                */
                            }
                            else{
                                this.props.loginPopup('show');
                            } 
                        }}>Like</a>
					
					</div> {/* \col */}
				</div> {/* \grid */}
			</div>				

		);
	}
}



import { likeJob, loginPopup } from '../actions'



const mapStateToProps = (state, ownProps) => {
	return{
		slug: ownProps.params.slug
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLike: (jobId) => {
			dispatch(likeJob(jobId))
		},

		loginPopup: (step) => {
			dispatch( loginPopup(step) )
		}
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobDetails)
