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
            job: {},
            keywords: [],
            skills: []
        }

        // this.changeActiveClient = this.changeActiveClient.bind(this);
    }

	componentDidMount() {

        let jobInitdata = window.jobDetails;
		let jobId = this.props.slug.split('-')[0]

        if(jobInitdata && jobInitdata.id == jobId){
        	this.setState({job: jobInitdata});
			this.setState({keywords: jobInitdata.keywords});
			this.setState({skills: jobInitdata.skills});
        }
        else{
			$.ajax({
				url: `/api/job/${jobId}`,
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
		} // else END
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
            else if(href.includes('linkedin')){
            	url = href + '&title=' + this.state.job.name + '&url=' + window.location.href;
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

	renderEmailShare(){
		let emailUrl = `mailto:?subject=${this.state.job.name} at ${this.state.job.company}&body=Hi%2C%0A%0A${this.state.job.company} is hiring a ${this.state.job.name}%21%0A%0A${window.location.href}`;
		return(
			<a href={emailUrl}>
	            <i className="fa fa-envelope"></i> {/*email*/}
            	{/* Email */}
            </a>
		);
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

        let jobTextClasses = ClassNames({
            'job-text': true,
            'job-text-loaded': Object.keys(this.state.job).length
        });

		if(this.props.isAuthProcess){
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
        else{
			return (
				<div className="container">
					<div id="grid" className="full-job grid row">

						<div className="col s12 l10 offset-l1">
							<div className="card">
								<div className="card-content">

									<h2 className="job-name center-align">{this.state.job.name}</h2>
									<h3 className="job-company card-title center-align">{this.state.job.company_name}</h3>
									
									<div className="job-details">
					    	    		<p className="left-align">{this.state.job.salary}</p>
					    	    		<p className="right-align">{this.state.job.exp}</p>
					    	    	</div>

									<div className={jobTextClasses} dangerouslySetInnerHTML={ this.renderText() }></div>

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

					                {this.renderEmailShare()}

					                <a onClick={(e) => this.share(e, 'https://www.linkedin.com/shareArticle?mini=true&source=Sagfi')} href="#" target="_blank">
					                	<i className="fa fa-linkedin-square"></i>
					                	{/* LinkedIn */}
					                </a>

					                <a onClick={(e) => this.share(e, `http://twitter.com/share?text=` )} href='#' target="_blank">
					                    <i className="fa fa-twitter"></i>
					                    {/* Twitter */}
					                </a>
					            
					                <a onClick={(e) => this.share(e, 'https://www.facebook.com/sharer/sharer.php?u=')} href="#" target="_blank">
					                	<i className="fa fa-facebook"></i>
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

							<a className="btn-apply waves-effect btn" href={this.state.job.url} target="_blank" rel="nofollow">
								Apply
							</a>

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
			); // return
		}
	}
}



import { likeJob, loginPopupShow } from '../actions'



const mapStateToProps = (state, ownProps) => {

	const currentJobId = ownProps.params.slug.split('-')[0]
	const likes_arr = state.entities.jobs.filter(job => job && job.job_id==currentJobId)

	return{
		isLiked: likes_arr.length > 0,
		slug: ownProps.params.slug,
        isAuthProcess: state.loginPopup.isAuthProcess
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
