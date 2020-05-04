import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TestCaseUpload from '../TestCase/TestCaseUpload';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import logo from './../common/MTaaSIcon.svg';
import * as routes from './constants/routes';
import SignOutButton from './SignOut';
import { Navbar, Nav, FormControl, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Navigation extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      authUser: null,
      history: props.history,
    };
  }

  componentDidUpdate(prevProps) {
    console.log('Previous :' + JSON.stringify(prevProps));
    console.log('Now :' + JSON.stringify(this.props));
    if (this.state.authUser === null) {
      if (this.props.authUser !== null) {
        this.setState({ authUser: this.props.authUser });
      }
    } else {
      if (this.props.authUser === null) {
        this.setState({ authUser: null });
      } else if (this.state.authUser.uid !== this.props.authUser.uid) {
        this.setState({ authUser: this.props.authUser });
      }
    }
  }

  getNavigationOption = () => {
    const isAuthenticated = this.state.authUser;
    const props = this.state;
    if (isAuthenticated) {
      return (
        <>
          {/*<Nav.Link href={routes.SIGN_IN}>Sign In</Nav.Link>*/}
          <Nav.Link href={routes.HOME}>Home</Nav.Link>
          <Nav.Link href={routes.ACCOUNT}>Account</Nav.Link>
          <Nav.Link href="#">Report Portal</Nav.Link>
          <Nav.Link href="#">Billing</Nav.Link>
          <div style={{ marginLeft: '800px' }}>
            <Form inline>
              <SignOutButton />
            </Form>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href={routes.LANDING}>Landing</Nav.Link>
          <Nav.Link href={routes.SIGN_IN}>Sign In</Nav.Link>
        </>
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              alt="User Icon"
              width="50"
              height="50"
              style={{ backgroundColor: 'White', borderRadius: '12.5px' }}
              class="d-inline-block align-center"
            />{' '}
            Impact
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">{this.getNavigationOption()}</Nav>
            {/*} <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>*/}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
