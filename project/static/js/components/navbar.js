import React from 'react'
import { Link } from 'react-router'

// const Navbar = ({ auth, getUser, user, jobs_count }) => {
class Navbar extends React.Component{

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    _auth(e){
        e.preventDefault()
        this.props.auth()
    }

    login(){
        if( this.isEmpty(this.props.user) ){
            return(
                <a href='#' onClick={e => this._auth(e) }>
                    Login via Twitter
                </a>
            );
        }
        else{
            return(
                <a>{this.props.user.first_name}</a>
            );
        }
    }

    popup(){

        if(this.props.popupIsShow){
            return(

                <div className="popup">

                    <a href="#" className="close" onClick={(e) => {
                        e.preventDefault();
                        this.props.loginPopupClose();
                    }}>
                        <i className="material-icons">close</i>
                    </a>

                    <div className="valign-wrapper">
                        <a href="#" className="valign soc-button twitter" onClick={e => this._auth(e) }>
                            Login via Twitter
                        </a>
                    </div>

                </div>
            );
        }
    }

    contactsPopupRender(){
        if(this.props.contactsPopupIsShow){
            return(
                <div className="popup">

                    <a href="#" className="close" onClick={(e) => {
                        e.preventDefault();
                        this.props.contactsPopupClose();
                    }}>
                        <i className="material-icons">close</i>
                    </a>

                    <div className="valign-wrapper">
                        <div className="valign contacts-popup__content">

                            <p style={{fontSize: '40px', margin: '0 0 10px'}}>Contact Me</p>


                            <a href="https://twitter.com/sihaelov" target="_blank">
                                 <i className="fa fa-twitter"></i>
                                 Twitter: <span>@sihaelov</span>
                            </a>

                            <br />

                            <a href="mailto:sihaelov@gmail.com">
                                <i className="fa fa-envelope"></i>
                                Email: <span>sihaelov@gmail.com</span>
                            </a>
                        </div>
                    </div>

                </div>
            );
        }
    }

    renderCat(){
        if(window.location.href.indexOf('ref=producthunt') !== -1){
            return <img id="productcat" src="/static/productcat.png" />
        }
    }

    render() {
        return (
            <div>

                {this.popup()}
                {this.contactsPopupRender()}

                {this.renderCat()}
                <div style={{marginBottom: '30px'}}>

                    <nav className="white black-text" style={{textColor: '#000'}}>
                        <div className="nav-wrapper" className="black-text">
                            <h1 className="brand-logo"><Link to='/'>Sagfi</Link></h1>
                            <ul className="right hide-on-med-and-down">
                                
                                <li>
                                    {/*
                                    <a href="mailto:sihaelov@gmail.com">
                                        Contact
                                    </a>
                                    */}

                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.props.contactsPopupShow();
                                    }}>
                                        Contacts
                                    </a>
                                </li>

                                <li>
                                    <Link to="/my-jobs" className="my-jobs">
                                        My Jobs
                                        <span id="jobs-counter"> {this.props.jobs_count}</span>        
                                    </Link>
                                </li>

                                <li>
                                    {this.login()}
                                </li>

                            </ul>
                        </div>
                    </nav>

                    <div className="notification-for-mob hide-on-large-only">
                        The mobile and tablet version has the limited functionality
                    </div>


                </div>


            </div>
        );
    }
    
}

export {Navbar}
