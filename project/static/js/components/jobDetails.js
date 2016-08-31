import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ClassNames from 'classnames'
import DocumentMeta from 'react-document-meta'

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

	renderLikeButton(){
		if(this.props.isLiked){
			return(
				<a className="btn-like waves-effect btn" href="#" onClick={(e) => {
	                e.preventDefault();
	                if( localStorage.getItem('sagfi_token') ){
	                    this.props.onLike(this.state.job.id);
	                }
	                else{
	                    this.props.loginPopupShow();
	                } 
	            }}>Like</a>
			);
		}
		else{
			return(
				<a className=" disabled" href="#" onClick={(e) => {
	                e.preventDefault();
	            }}>Liked</a>
			);
		}
	}
	
	render() {

		let title = 'Sagfi';

		if(this.state.job.name){
			title = `Sagfi — ${this.state.job.name} at ${this.state.job.company}`;
		}

		const meta = {
			title: title,
			description: 'A smart aggregator of remote jobs with AI',
			canonical: window.location.href,

			meta: {
		        property: {
		        	'og:type': 'article',
		        	"og:title": `${this.state.job.name} is hiring a ${this.state.job.company}`,
		        	"og:description": `A smart aggregator of remote jobs with AI`,
		        	"og:site_name": "Sagfi.com",

		        	"twitter:card": "summary",
		        	"twitter:title": `${this.state.job.name} is hiring a ${this.state.job.company}`,
		        	"twitter:description": `A smart aggregator of remote jobs with AI`,
		        }


			    // <meta property= content="http://startupden.ru/media/{{post.image}}" />
			    // <meta property= content="http://startupden.ru/media/{{post.image}}" />
		    },

		    extend: true
	    };


		let likeClasses = ClassNames('hide-on-med-and-down btn-like waves-effect btn',
		{
            'disabled': this.props.isLiked
        });

		return (
			<DocumentMeta {...meta} extend >

				<div className="container">
					<div id="grid" className="full-job grid row">

						<div className="col s12 l10 offset-l1">
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

							<a className={likeClasses} href="#" onClick={(e) => {
	                            e.preventDefault();
	                            if( localStorage.getItem('sagfi_token') ){
	                               
	                                if(this.props.isLiked){
	                                    // this.props.onDislike();
	                                }
	                                else{
	                                    // this.setState({ isLiked: true });
		                                this.props.onLike(this.state.job.id);
	                                }
	                            }
	                            else{
	                                this.props.loginPopupShow();
	                            } 
	                        }}>Like</a>
						
						</div> {/* \col */}
					</div> {/* \grid */}
				</div>
			</DocumentMeta>


		);
	}
}



import { likeJob, loginPopupShow } from '../actions'



const mapStateToProps = (state, ownProps) => {

	const currentJobId = ownProps.params.slug.split('-')[0]
	const likes_arr = state.entities.jobs.filter(job => job && job.job_id==currentJobId)

	return{
		isLiked: likes_arr.length > 0,
		slug: ownProps.params.slug
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLike: (jobId) => {
			dispatch(likeJob(jobId))
		},

		loginPopupShow: () => {
			dispatch( loginPopupShow() )
		}
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobDetails)
