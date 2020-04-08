import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TestCaseUpload from '../TestCase/TestCaseUpload';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import * as routes from './constants/routes';
import SignOutButton from './SignOut';

class Navigation extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { authUser: null };
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
  render() {
    return (
      <div>
        {this.state.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    );
  }
}

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={routes.UPLOAD_TESTCASE}>Account</Link>
    </li>
    <div>
      <Route path="/upload-test-case" component={TestCaseUpload} />
    </div>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
