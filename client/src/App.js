import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AuthenticationPage from './components/authentication/Authentication';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import CreateRun from './components/TestRunner/CreateRun';
import GetRun from './components/TestRunner/GetRun';
import Chatbot from './components/chatbot/Chatbot';
class App extends Component {
  componentDidMount() {
    localStorage.setItem('user', '{"signedout" : true}');
  }

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
            <Route path="/run/:id/:id2" component={GetRun} />
          </div>
        </div>
        <Chatbot />
      </Router>
    );
  }
}

export default App;
