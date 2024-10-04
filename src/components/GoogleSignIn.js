import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode properly

const GoogleSignIn = () => {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    console.log('Logged in user:', decoded);
    // Store user info in local storage or context if needed
  };

  const handleLoginError = () => {
    alert('Login Failed. Please try again.');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign in to WALLI</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default GoogleSignIn;
