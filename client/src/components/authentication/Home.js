import React, { Component } from 'react';
import ViewProjects from './../projects/viewprojects';
import CreateProject from './../projects/createproject';
import ProjectAnalytics from './../projects/projectanalytics';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }
  componentDidUpdate(prevProps) {
    if (localStorage.getItem('user') === 'signedout') {
      this.setState({ user: null });
      localStorage.removeItem('user');
    }
  }

  getHomePage = () => {
    const user = this.state.user;
    if (!user) {
      return <div></div>;
    }
    if (user.usertype === 'Manager') {
      return (
        <div>
          <ViewProjects></ViewProjects>
          <CreateProject></CreateProject>
          <ProjectAnalytics></ProjectAnalytics>
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
    return (
      <div>
        <h1>Home Page</h1>
        {this.getHomePage()}
      </div>
    );
  }
}

export default HomePage;
