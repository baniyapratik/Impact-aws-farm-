import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from './../common/MTaaSicon.png';
import { SignUpLink } from './SignUp';
import { auth } from './firebase';
import * as routes from './constants/routes';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import style from './styles/style.css';

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
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

  SignUpLink = () => (
    <p>
      Don't have an account?{' '}
      <Link className="underlineHover" to={routes.SIGN_UP}>
        Sign Up!
      </Link>
    </p>
  );

  onSubmit = (event) => {
    const { email, password, usertype } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        const firebaseid = authUser.user.uid;
        let url = `${routes.BACKEND_SERVER}${usertype}/${firebaseid}`;
        if(usertype === 'testers'){
          url = `${routes.BACKEND_SERVER}${usertype}/firebase/${firebaseid}`
        }
        
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
          const error = {
            message: err.response.data.messsage.message,
          };
  
          this.setState(byPropKey('error', err));
          });
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };
  clearError = () => {
    this.setState(byPropKey('error', null));
  };

  render() {
    const { email, password, usertype, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <form onSubmit={this.onSubmit}>
            <div class="fadeIn first">
              <img src={logo} id="icon" alt="User Icon" />
            </div>
            <input
              value={email}
              onChange={(event) =>
                this.setState(byPropKey('email', event.target.value))
              }
              type="text"
              placeholder="Email Address"
              class="fadeIn first"
            />
            <input
              value={password}
              onChange={(event) =>
                this.setState(byPropKey('password', event.target.value))
              }
              type="password"
              placeholder="Password"
              class="fadeIn second"
            />
            <select
              value={usertype}
              onChange={(event) =>
                this.setState(byPropKey('usertype', event.target.value))
              }
              class="fadeIn third leaveSpace"
            >
              <option value="managers">Manager</option>
              <option value="testers">Tester</option>
            </select>
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <Button
                  disabled={isInvalid}
                  variant="primary"
                  className="fadeIn fourth"
                  type="submit"
                  block
                >
                  Sign In
                </Button>
              </div>
            </div>

            {error && (
              <div class="alert alert-danger alert-dismissible fade show login-error">
                <strong>Error!</strong> {error.message}
                <button type="button" class="close" onClick={this.clearError}>
                  &times;
                </button>
              </div>
            )}
          </form>
          <div id="formFooter">
            <SignUpLink />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
