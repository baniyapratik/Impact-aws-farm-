import React from 'react';
import ReactDOM from 'react-dom';
import LandingComponent from './LandingComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingComponent />, div);
});
