import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Start loading state

    try {
      const response = await fetch("https://walli-django-production.up.railway.app/api/signup/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if token is in the response and store it in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token); // Store token in localStorage
        }

        // Store user ID in local storage
        if (data.userInfo && data.userInfo.id) {
          localStorage.setItem('userId', data.userInfo.id); // Store user ID
        }

        alert(data.message); // Show success message
        // Clear input fields
        setUsername('');
        setPassword('');
        setEmail('');
        // Redirect to sign-in page after successful signup
        navigate('/signin');
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData); // Log error for debugging
        setError(errorData.error || 'An error occurred. Please try again.'); // Display error message
      }
    } catch (error) {
      console.error('Network error:', error); // Log network errors
      setError('Network error. Please try again.'); // Display network error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up to W A L L I</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="error">{error}</p>} {/* Display error if exists */}
      </form>
    </div>
  );
};

export default SignUp;
