import React, { Component } from 'react';
import axios from 'axios';
import * as routes from '../authentication/constants/routes';
import { Table, Button, Alert } from 'react-bootstrap';
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: '',
      project: this.props,
      user: JSON.parse(localStorage.getItem('user')),
      error: false,
    };
  }
  enrollTester = () => {
    const updateProjectRequest = this.state.project;
    const user = this.state.user;
    updateProjectRequest.testers.push({ tester: user._id, status: 'Pending' });
    const url = `${routes.BACKEND_SERVER}projects/${updateProjectRequest.id}`;
    axios
      .patch(url, updateProjectRequest)
      .then((res) => {
        console.log(res);
        this.setState({ project: res.data.data.project });
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: err.message,
        };
        this.setState(byPropKey('error', error));
      });
    console.log(updateProjectRequest);
  };

  getTestersData = () => {
    const project = this.state.project;
    const numberOfRequiredTesters = project.requiredtesters;
    const pendingTesters = project.testers.filter((element) => {
      return element.status === 'Pending';
    }).length;
    const acceptedTesters = project.testers.filter((element) => {
      return element.status === 'Accepted';
    }).length;
    const deniedTesters = project.testers.filter((element) => {
      return element.status === 'Denied';
    }).length;
    const currentTesters = project.testers.length - deniedTesters;
    return (
      <>
        <h4>Testers</h4>
        <Table
          striped
          bordered
          hover
          responsive
          variant="dark"
          style={{ marginTop: '15px', textAlign: 'center' }}
        >
          <thead>
            <tr>
              <th>Current</th>
              <th>Pending</th>
              <th>Accepted</th>
              <th>Denied</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentTesters}</td>
              <td>{pendingTesters}</td>
              <td>{acceptedTesters}</td>
              <td>{deniedTesters}</td>
              <td>{numberOfRequiredTesters}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  };

  render() {
    const user = this.state.user;
    const checkEnrollment = (element) => {
      return element.tester === user._id && element.status !== 'Denied';
    };
    const project = this.state.project;
    const isEnrolled = project.testers.findIndex(checkEnrollment) !== -1;

    return (
      <>
        <hr></hr>
        <center>
          <div class="row">
            <div class="col-sm">
              <label>
                <b>Project Name</b>
              </label>
            </div>
            <div class="col-sm">{project.name}</div>
          </div>
          {this.getTestersData()}
          <Button
            style={{ marginTop: '15px', textAlign: 'center' }}
            disabled={isEnrolled}
            onClick={this.enrollTester}
          >
            Enroll
          </Button>
          <Alert
            show={isEnrolled}
            dismissible={true}
            variant="info"
            style={{ marginTop: '15px' }}
          >
            Already enrolled or has been accepted
          </Alert>
        </center>
      </>
    );
  }
}

export default Enroll;
