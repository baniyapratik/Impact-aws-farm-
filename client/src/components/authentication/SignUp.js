import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from './firebase';
import axios from 'axios';
import style from './styles/stylesignup.css';

import * as routes from './constants/routes';

const SignUpPage = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  usertype: 'Manager',
  address: '',
  city: '',
  userstate: 'California',
  zip: '',
  cardnumber: '',
  cvv: '',
  dateofexpiry: '',
  technology: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  getExtraDetails = (usertype) => {
    const { cardnumber, cvv, technology, dateofexpiry } = this.state;
    if (usertype === 'Manager') {
      return (
        <div>
        <h4>Card Details</h4>
        <div class ="row">
            <div class="col-sm-6">
              <input
                value={cardnumber}
                onChange={(event) => {
                  let newcardnumber = event.target.value.replace(/ /g, '');
                  this.setState(byPropKey('cardnumber', newcardnumber));
                }}
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="20"
                size="20"
              />
            </div>
            <div class="col-sm-3">  
              <input
                value={cvv}
                onChange={(event) =>
                  this.setState(byPropKey('cvv', event.target.value))
                }
                type="text"
                placeholder="XXX"
              />
            </div>
            <div class="col-sm-3">  
              <input
                value={dateofexpiry}
                onChange={(event) =>
                  this.setState(byPropKey('dateofexpiry', event.target.value))
                }
                type="text"
                placeholder="02/20"
              />
            </div>
        </div>
      </div>  
      );
    } else if (usertype === 'Tester') {
      return (
        <div>
          <h4>Technology</h4>
          <div class ="row">
            <div class ="col-sm">
              <input
                value={technology}
                onChange={(event) =>
                  this.setState(byPropKey('technology', event.target.value))
                }
                type="text"
                placeholder="Java,Javascript,Python"
              />
            </div>
          </div>
        </div>  
      );
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    console.log(this.state);
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        const createUserObject = this.state;
        createUserObject.name = this.state.username;
        createUserObject.state = this.state.userstate;
        createUserObject.firebaseId = authUser.user.uid;
        const carddetails = {};
        carddetails.cardnumber = this.state.cardnumber;
        carddetails.cvv = this.state.cvv;
        carddetails.dateofexpiry = this.state.dateofexpiry;
        createUserObject.carddetails = carddetails;
        console.log(createUserObject);
        if (createUserObject.usertype === 'Manager') {
          axios
            .post(`${routes.BACKEND_SERVER}managers/`, createUserObject)
            .then((res) => {
              console.log(res);
              console.log(res.data);
              localStorage.setItem(
                'user',
                JSON.stringify(res.data.data.manager)
              );
              history.push(routes.HOME);
            })
            .catch((err) => {
              console.log(err);
          const error = {
            message: err.response.data.messsage.message,
          };
          
          this.setState(byPropKey('error', err));
            });
        } else if (createUserObject.usertype === 'Tester') {
          axios
            .post(`${routes.BACKEND_SERVER}testers/`, createUserObject)
            .then((res) => {
              console.log(res);
              console.log(res.data);
              localStorage.setItem(
                'user',
                JSON.stringify(res.data.data.tester)
              );
              history.push(routes.HOME);
            })
            .catch((err) => {
              console.log(err);
              const error = {
                message: err.response.data.messsage.message,
              };
      
              this.setState(byPropKey('error', err));
            });
        }
        //this.setState({ ...INITIAL_STATE });
        
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });
  };

  clearError = () => {
    this.setState(byPropKey('error', null));
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      address,
      userstate,
      city,
      zip,

      usertype,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div class="signupwrapper fadeInDown container">
        <div id="signupformContent">
          <h1>SignUp Page</h1>
          <form onSubmit={this.onSubmit}>
            <div class ="row">
              <div class= "col-sm-6">
                <input
                  value={username}
                  onChange={(event) =>
                    this.setState(byPropKey('username', event.target.value))
                  }
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div class="col-sm-6">
              <input
                value={email}
                onChange={(event) =>
                  this.setState(byPropKey('email', event.target.value))
                }
                type="text"
                placeholder="Email Address"
              />
            </div>
            </div>
            <div class ="row">
              <div class ="col-sm-6"> 
                <input
                  value={passwordOne}
                  onChange={(event) =>
                    this.setState(byPropKey('passwordOne', event.target.value))
                  }
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div class="col-sm-6">
                <input
                  value={passwordTwo}
                  onChange={(event) =>
                    this.setState(byPropKey('passwordTwo', event.target.value))
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div class ="row">
              <div class="col-sm-6">
                <input
                  value={address}
                  onChange={(event) =>
                    this.setState(byPropKey('address', event.target.value))
                  }
                  type="text"
                  placeholder="Street Name House/Apartment No"
                  
                />
              </div>
              <div class="col-sm-2">
                </div>
              <div class="col-sm-2">
                <input
                  value={city}
                  onChange={(event) =>
                    this.setState(byPropKey('city', event.target.value))
                  }
                  type="text"
                  placeholder="City"
                />
               </div> 
            </div>
            <div class ="row">
              <div class ="col-sm-6">
                <select
                value={userstate}
                onChange={(event) =>
                  this.setState(byPropKey('userstate', event.target.value))
                }
                required
                style = {{margin : "15px"}}
                >
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
              <div class="col-sm-2"></div>
              <div class ="col-sm-2">
                <input
                  value={zip}
                  onChange={(event) =>
                    this.setState(byPropKey('zip', event.target.value))
                  }
                  type="text"
                  placeholder="Zip"
                />
              </div>
            </div>  
            <div class ="row">
              <div class ="col-sm"></div>
              <div class ="col-sm">
                <select
                  value={usertype}
                  onChange={(event) =>
                    this.setState(byPropKey('usertype', event.target.value))
                  }
                  style = {{margin : "15px"}}
                >
                  <option value="Manager">Manager</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>
              <div class ="col-sm"></div>
            </div>
            {this.getExtraDetails(usertype)}
            <div id ="signupformFooter">
            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>
            {error && (
            <div class="alert alert-danger alert-dismissible fade show login-error">
                <strong>Error!</strong> {error.message}
                <button type="button" class="close" onClick={this.clearError}>
                  &times;
                </button>
              </div>
            )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
