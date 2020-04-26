import React, { Component } from 'react';
import CreateRun from './../TestRunner/CreateRun';

class RunTests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = JSON.parse(localStorage.getItem('user'));
    this.state.project = props;
  }

  render() {
    return (
      <>
        <CreateRun {...this.state.project}></CreateRun>
      </>
    );
  }
}

export default RunTests;
