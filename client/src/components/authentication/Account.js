import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from './firebase';
import axios from 'axios';
import style from './styles/stylesignup.css';

import * as routes from './constants/routes';

const SignUpPage = ({ history }) => (
  <div>
    <AccountPage history={history} />
  </div>
);




const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('user'));
  }


  getExtraDetails = (usertype) => {

    if (usertype === 'Manager') {
      const { cardnumber, cvv, dateofexpiry } = this.state.carddetails;
      return (
        <div>
          <h4>Card Details</h4>
          <div class="row">
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
      const technology = this.state.technology;
      return (
        <div>
          <h4>Technology</h4>
          <div class="row">
            <div class="col-sm">
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
    const { history } = this.props;
    console.log(this.state);
    const createUserObject = this.state;
    createUserObject.name = this.state.username;
    createUserObject.state = this.state.userstate;
    const carddetails = {};
    carddetails.cardnumber = this.state.cardnumber;
    carddetails.cvv = this.state.cvv;
    carddetails.dateofexpiry = this.state.dateofexpiry;
    createUserObject.carddetails = carddetails;
    console.log(createUserObject);
    if (createUserObject.usertype === 'Manager') {
      axios
        .patch(`${routes.BACKEND_SERVER}managers/${createUserObject._id}`, createUserObject)
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
        .patch(`${routes.BACKEND_SERVER}testers/${createUserObject._id}`, createUserObject)
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

  };

  clearError = () => {
    this.setState(byPropKey('error', null));
  };

  render() {
    const {
      name,
      email,
      error,
      address,
      state,
      city,
      zip,

      usertype,
    } = this.state;
    const isInvalid =
      email === '' ||
      name === '';

    return (
      <div class="signupwrapper fadeInDown container">
        <div id="signupformContent">
          <h1>Account Page</h1>
          <form onSubmit={this.onSubmit}>
            <div class="row">
              <div class="col-sm-6">
                <input
                  value={name}
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
                  placeholder="Cannot change email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <input
                  onChange={(event) =>
                    this.setState(byPropKey('password', event.target.value))
                  }
                  type="password"
                  placeholder="Cannot change password"
                  disabled
                />
              </div>
              <div class="col-sm-6">
                <input
                  onChange={(event) =>
                    this.setState(byPropKey('password', event.target.value))
                  }
                  type="password"
                  placeholder="Cannot change password"
                  disabled
                />
              </div>
            </div>
            <div class="row">
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
            <div class="row">
              <div class="col-sm-6">
                <select
                  value={state}
                  onChange={(event) =>
                    this.setState(byPropKey('state', event.target.value))
                  }
                  required
                  style={{ margin: "15px" }}
                >
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
              <div class="col-sm-2"></div>
              <div class="col-sm-2">
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
            <div class="row">
              <div class="col-sm"></div>
              <div class="col-sm">
                <select
                  value={usertype}
                  onChange={(event) =>
                    this.setState(byPropKey('usertype', event.target.value))
                  }
                  style={{ margin: "15px" }}
                  disabled
                >
                  <option value="Manager">Manager</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>
              <div class="col-sm"></div>
            </div>
            {this.getExtraDetails(usertype)}
            <div id="signupformFooter">
              <button disabled={isInvalid} type="submit">
                Update Account
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





export default AccountPage;
