import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from './firebase';
import * as routes from './constants/routes';
import axios from 'axios';

const SignInPage = ({ history }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  usertype: 'managers',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password, usertype } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        const firebaseid = authUser.user.uid;
        const url = `${routes.BACKEND_SERVER}${usertype}/${firebaseid}`;
        axios
          .get(url)
          .then((res) => {
            console.log(res);
            if (
              (res.data.data.manager && res.data.data.manager.length === 0) ||
              (res.data.data.tester && res.data.data.tester.length === 0)
            ) {
              auth.doSignOut();
              const err = {};
              err.message = 'User type is incorrect for the given email';
              throw err;
            }
            localStorage.setItem(
              'user',
              JSON.stringify(
                res.data.data.manager
                  ? res.data.data.manager[0]
                  : res.data.data.tester[0]
              )
            );
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch((err) => {
            console.log(err);
            this.setState(byPropKey('error', err));
          });
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, usertype, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={(event) =>
            this.setState(byPropKey('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={(event) =>
            this.setState(byPropKey('password', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <select
          value={usertype}
          onChange={(event) =>
            this.setState(byPropKey('usertype', event.target.value))
          }
        >
          <option value="managers">Manager</option>
          <option value="testers">Tester</option>
        </select>

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
