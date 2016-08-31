import React from 'react'
import DocumentMeta from 'react-document-meta'
import VisibleNavbar from '../containers/navbar.js'


class App extends React.Component{

	render() {

		const meta = {
			title: 'Sagfi',
			description: 'A smart aggregator of remote jobs with AI',
			canonical: window.location.href,

			meta: {
		        property: {
		        	'og:type': 'website',
		        	"og:title": `Sagfi`,
		        	"og:description": `A smart aggregator of remote jobs with AI`,
		        	"og:image": `http://${window.location.hostname}/static/facebook_op.png`,
		        	"og:site_name": "Sagfi.com",
		        	"og:url": window.location.href,

		        	"twitter:card": "summary",
		        	"twitter:title": `Sagfi`,
		        	"twitter:description": `A smart aggregator of remote jobs with AI`,
		        	"twitter:image": `http://${window.location.hostname}/static/twitter_op.png`,
		        	"twitter:url": window.location.href,
		        }


			    // <meta property= content="http://startupden.ru/media/{{post.image}}" />
			    // <meta property= content="http://startupden.ru/media/{{post.image}}" />
		    },
	    };

		return (
			<div>
				<DocumentMeta {...meta} />
				<VisibleNavbar />
				{this.props.children}
			</div>
		);
	}

}

export { App }
