
import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import AuthenticationPage from './components/authentication/Authentication'
import React from 'react';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import CreateRun from "./components/TestRunner/CreateRun";
import { Route, BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
  componentDidMount(){
    
  }
 
  render() {
   return (
    <Router>
    <div className="App">
      
      <div>
        <Route path="/" component ={AuthenticationPage}/>
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
