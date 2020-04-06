import React from 'react';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import CreateRun from "./components/TestRunner/CreateRun";
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route path="/upload-test-case" component={TestCaseUpload} />
          <Route path="/createrun" component={CreateRun} />
        </div>
      </div>
    </Router>
  );
}

export default App;
