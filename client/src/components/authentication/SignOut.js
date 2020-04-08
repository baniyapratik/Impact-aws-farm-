import React from 'react';
import * as routes from '../authentication/constants/routes';

import { auth } from './firebase';

const handleSignOut = () => {
  auth.doSignOut();
  localStorage.setItem('user', 'signedout');
};

const SignOutButton = () => (
  <button type="button" onClick={handleSignOut}>
    Sign Out
  </button>
);

export default SignOutButton;
