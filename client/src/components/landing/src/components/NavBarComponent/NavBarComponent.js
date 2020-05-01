import React, { Component } from 'react';
import './style.css';
import * as Scroll from 'react-scroll';
import { Link, Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import { Navbar, Nav, FormControl, Button } from 'react-bootstrap';
import * as routes from '../../../../../components/authentication/constants/routes';
/*import AuthenticationPage from '../../../components/authentication/Authentication';*/

class NavBarComponent extends Component{
  constructor(props){
    super(props);
    this.state = {mnuShow:false};
    this.closeMnu = this.closeMnu.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', ()=> {
      console.log("begin", arguments);
      this.closeMnu();
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });
    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  toggleShow(){
    this.setState({mnuShow:!this.state.mnuShow});
  }

  closeMnu(){
    if(this.state.mnuShow){
      this.setState({mnuShow:false});
    }
  }

  scrollToTop() {
    scroll.scrollToTop();
  }
/*
  getNavigationOption = () => {
    return (
        <>
          <Nav.Link href={routes.LANDING}>Landing</Nav.Link>
          <Nav.Link href={routes.SIGN_IN}>Sign In</Nav.Link>
        </>
      );
  };
*/
  render(){
    const show = this.state.mnuShow ? "show" : "";
    return (
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${this.props.navBarShrink}`} id="mainNav">
        <div className="container">
          <a onClick={this.scrollToTop.bind(this)} className="navbar-brand js-scroll-trigger" href="#page-top">Team Impact</a>
          <button onClick={this.toggleShow.bind(this)} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className={`collapse navbar-collapse ${show}`} id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link activeClass="active" className="nav-link js-scroll-trigger" to="download" spy={true} smooth="easeInOutQuart" duration={1000} >Product</Link>
              </li>
              <li className="nav-item">
                <Link activeClass="active" className="nav-link js-scroll-trigger" to="features" spy={true} smooth="easeInOutQuart" duration={1000} >Features</Link>
              </li>
              <li className="nav-item">
                <Nav.Link href={routes.SIGN_IN}>Sign In</Nav.Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBarComponent;