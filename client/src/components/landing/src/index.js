import React from 'react';
import ReactDOM from 'react-dom';
import LandingComponent from './LandingComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LandingComponent />, document.getElementById('root'));
registerServiceWorker();
