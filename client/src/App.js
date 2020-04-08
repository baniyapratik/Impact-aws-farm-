import React, { Component } from 'react';

import {Route, BrowserRouter as Router} from 'react-router-dom';
import AuthenticationPage from './components/authentication/Authentication'


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
    </Router>
  );
 } 
}

export default App;
