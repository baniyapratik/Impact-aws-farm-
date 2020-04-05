import React from 'react';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import VerticalTabs from "./components/TestRunner/VerticalTabs";
import CreateRun from "./components/TestRunner/CreateRun";
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route path="/upload-test-case" component={TestCaseUpload} />
          <Route path="/testrunner" component={VerticalTabs} />
          <Route path="/createtest" component={CreateRun} />
        </div>
      </div>
    </Router>
  );
}

export default App;
