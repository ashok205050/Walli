import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "508427224480-akif3jf54m5l6p930eb32eqilh5fja7d.apps.googleusercontent.com"; // Replace with your actual client ID


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId={clientId}>

  <React.StrictMode>
      <App />
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')

);
