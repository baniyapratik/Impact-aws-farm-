import React from 'react';
import TestCaseUpload from './components/TestCase/TestCaseUpload';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import UploadAPK from "./components/upload/Upload";
import "./App.css";

function App() {
  return (
    <Router>
    <div className="App">
      <div>
        <Route path="/upload-test-case" component={TestCaseUpload} />
        <Route path="/upload-apk" component={UploadAPK} />
      </div>
    </div>
    </Router>
  );
}

export default App;
