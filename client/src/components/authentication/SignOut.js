import React, { Component } from 'react';
import * as routes from '../authentication/constants/routes';

import { auth } from './firebase';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  handleSignOut = () => {

    auth.doSignOut();
    localStorage.setItem('user', '{"signedout" : true}');
    this.setState({ redirect: routes.SIGN_IN });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (

      <>
        <Button variant="outline-success" onClick={this.handleSignOut}>
          Sign Out
  </Button>
      </>
    )
  }


}

export default SignOutButton;
