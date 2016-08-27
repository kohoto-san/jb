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

                <div className="login-popup">

                    <a href="#" className="close" onClick={(e) => {
                            e.preventDefault();
                            this.props.loginPopupClose();
                            // this.props.loginPopup('close');
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

    render() {
        return (
            <div>

                {this.popup()}


                <div style={{marginBottom: '30px'}}>

                {/*
                    <Link to="/my-jobs" className="my-jobs">
                        <p>
                            My Jobs
                            <span id="jobs-counter"> {this.props.jobs_count}</span>     
                        </p>
                    </Link>

                    <a href='#' onClick={e => {
                        e.preventDefault()
                        this.props.auth()
                    }}>
                            Login via Twitter
                    </a>
                */}


                    <nav className="white black-text" style={{textColor: '#000'}}>
                        <div className="nav-wrapper" className="black-text">
                            <Link to='/' className="brand-logo">Sagfi</Link>
                            <ul className="right">
                                
                                <li>
                                    <Link to="/my-jobs" className="my-jobs">
                                            My Jobs
                                            <span id="jobs-counter"> {this.props.jobs_count}</span>        
                                    </Link>
                                </li>

                                <li>
                                    {this.login()}

                                    {/*
                                        {this.props.user.map(function(wtf) {
                                                return(wtf);
                                            }
                                        )}
                                    */}

                                    
                                       
                                </li>

                            </ul>
                        </div>
                    </nav>


                </div>


            </div>
        );
    }
    
}

export {Navbar}
