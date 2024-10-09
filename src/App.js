// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WallpaperList from './components/WallpaperList';
import WallpaperUpload from './components/WallpaperUpload';
import ImageDetails from './components/ImageDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; 
import Aboutus from './components/Aboutus';
import SignIn from './components/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword'; // Import ResetPassword
import ResetPasswordConfirm from './components/ResetPasswordConfirm'; // Import ResetPasswordConfirm

const App = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleGoogleSuccess = (response) => {
    console.log('Google Sign-In Success:', response);
    setUserInfo(response);
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
  };

  const isAuthPage = 
    location.pathname === '/upload' || 
    location.pathname === '/signin' || 
    location.pathname === '/signup' || 
    location.pathname === '/reset-password' || 
    location.pathname.includes('/reset-password-confirm'); // Include reset password

  const isImagePage = location.pathname.includes('/image/');
  const isContactPage = location.pathname === '/contact'; 
  const isAboutPage = location.pathname === '/about'; 

  return (
    <GoogleOAuthProvider clientId="508427224480-akif3jf54m5l6p930eb32eqilh5fja7d.apps.googleusercontent.com">
      <div>
        {!isAuthPage && !isImagePage && !isContactPage && !isAboutPage && (
          <Navbar 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            setSelectedCategory={setSelectedCategory} 
            setSearchQuery={setSearchQuery} // Pass setSearchQuery to Navbar
          />
        )}
        <div className="App">
          <Routes>
            <Route path="/" element={<WallpaperList selectedCategory={selectedCategory} searchQuery={searchQuery} />} />
            <Route path="/upload" element={<WallpaperUpload />} />
            <Route path="/signin" element={<SignIn setUserInfo={setUserInfo} />} />
            <Route path="/image/:id" element={<ImageDetails />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} /> {/* Password reset route */}
            <Route path="/reset-password-confirm/:uid/:token" element={<ResetPasswordConfirm />} /> {/* Password reset confirm route */}
          </Routes>
        </div>
        {!isAuthPage && !isImagePage && !isContactPage && !isAboutPage && <Footer />}
      </div>
    </GoogleOAuthProvider>
  );
};

// Wrap App with Router
const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;  
