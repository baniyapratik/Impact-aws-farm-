import React, { Component } from 'react';
import ViewProjects from './../projects/viewprojects';
import CreateProject from './../projects/createproject';

import { Button } from 'react-bootstrap';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = JSON.parse(localStorage.getItem('user'));
    this.createProjectModal = React.createRef();
    this.viewProjects = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (localStorage.getItem('user') === 'signedout') {
      this.setState({ user: null });
      localStorage.removeItem('user');
    }
  }

  showCreateProjectModal = () => {
    this.createProjectModal.current.handleShow();
  };

  getNewProjects = () => {
    this.viewProjects.current.getProjects();
  };

  getHomePage = () => {
    const user = this.state.user;

    if (!user) {
      return <div></div>;
    }
    const usertype = this.state.user.usertype === 'Manager';
    if (user.usertype === 'Manager') {
      return (
        <div>
          <center>
            {usertype && (
              <Button
                variant="secondary"
                size="lg"
                onClick={this.showCreateProjectModal}
              >
                Create Project
              </Button>
            )}
            <hr></hr>
          </center>
          <ViewProjects ref={this.viewProjects}></ViewProjects>
          <div class="row">
            <CreateProject
              ref={this.createProjectModal}
              action={this.getNewProjects}
            ></CreateProject>
          </div>
        </div>
      );
    } else if (user.usertype === 'Tester') {
      return (
        <div>
          <ViewProjects></ViewProjects>
        </div>
      );
    }
  };

  render() {
    return <>{this.getHomePage()}</>;
  }
}

export default HomePage;
