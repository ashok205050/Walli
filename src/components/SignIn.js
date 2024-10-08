import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Google login success
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    localStorage.setItem('userInfo', JSON.stringify(decoded));
    localStorage.setItem('username', decoded.name || decoded.email); // Save username in local storage
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
    fetch('http://localhost:8000/api/login/', { // Use the full URL to your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo)); // Save user info to local storage
        localStorage.setItem('username', username); // Save username to local storage
        setSuccessMessage('Login Successful!');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />

      <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
      <p>Forgot your password? <button onClick={() => navigate('/reset-password')}>Reset Password</button></p>
    </div>
  );
};

export default SignIn;
