import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // API call to reset password
    fetch('http://localhost:8000/api/password-reset-confirm/', { // Adjust to your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, token, new_password: newPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reset password. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Password has been reset successfully! You can now log in.');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="reset-password-confirm-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default ResetPasswordConfirm;
