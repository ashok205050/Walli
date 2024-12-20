import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Changed to identifier for username/email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle Google login success
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    localStorage.setItem('userInfo', JSON.stringify(decoded));
    localStorage.setItem('username', decoded.name || decoded.email.split('@')[0]); // Save username in local storage
    localStorage.setItem('token', token); // Save token in local storage

    setSuccessMessage('Login Successful!');
    setTimeout(() => {
      navigate('/'); // Redirect to home page after 2 seconds
    }, 2000);
  };

  // Handle login error
  const handleLoginError = () => {
    setErrorMessage('Login failed. Please try again.');
  };

  // Handle form submit for manual login (username/password)
  const handleSubmit = (e) => {
    e.preventDefault();

    // API call for login
    fetch('https://walli-django-production.up.railway.app/api/login/', { // Use the full URL to your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }), // Use identifier instead of username
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
        return response.json();
      })
      .then((data) => {
        // Check if userInfo is present in the response
        if (!data.userInfo) {
          throw new Error('No user info received from server');
        }

        // Save user info and tokens to local storage
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
        localStorage.setItem('username', data.userInfo.username || identifier.split('@')[0]);
        localStorage.setItem('token', data.token); // Save access token
        localStorage.setItem('refresh_token', data.refresh_token); // Save refresh token if provided by the backend

        // Save user ID in local storage
        localStorage.setItem('userId', data.userInfo.id); // Save user ID

        setSuccessMessage('Login Successful!');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility state
  };

  return (
    <div className="signin-container">
      <h2>Sign In to W A L L I</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button className="signin-button" type="submit">Sign In</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <p>Don't have an account? <button className="button" onClick={() => navigate('/signup')}>Sign Up</button></p>
      <p>Forgot your password? <button className="button" onClick={() => navigate('/reset-password')}>Reset Password</button></p>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default SignIn;
