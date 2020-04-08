import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AuthenticationPage from './components/authentication/Authentication';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import CreateRun from './components/TestRunner/CreateRun';

class App extends Component {
  componentDidMount() {}

  render() {
    console.log(process.env.REACT_APP_FIREBASE_APIKEY);
    return (
      <Router>
        <div className="App">
          <div>
            <Route path="/" component={AuthenticationPage} />
          </div>
        </div>
        <div className="App">
          <div>
            <Route path="/upload-test-case" component={TestCaseUpload} />
            <Route path="/createrun" component={CreateRun} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
