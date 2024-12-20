import React, { useState } from 'react';
import './ContactForm.css'; // Ensure to import the CSS file for styles

const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://walli-django-production.up.railway.app/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_name: fullName, email, message }),
    });

    const data = await response.json();
    if (response.ok) {
      setResponseMessage(data.message);
      setFullName('');
      setEmail('');
      setMessage('');
    } else {
      setResponseMessage('Error submitting the form.');
    }
  };

  return (
    <>
          <header className="privacy-policy-header">
        <h1>Contact to W A L L I</h1>
      </header>
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <textarea 
            placeholder="Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>

    <footer className="privacy-policy-footer">
        <p>&copy; 2024 W A L L I. All rights reserved.</p>
      </footer>

    </>
  );
};

export default ContactForm;
