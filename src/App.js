import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WallpaperList from './components/WallpaperList';
import Upload from './components/Upload'; 
import ImageDetails from './components/ImageDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; 
import Aboutus from './components/Aboutus';
import SignIn from './components/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword'; 
import ResetPasswordConfirm from './components/ResetPasswordConfirm'; 
import ProfilePage from './components/ProfilePage';

const App = () => {
  const location = useLocation(); // useLocation should be inside App component
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoogleSuccess = (response) => {
    console.log('Google Sign-In Success:', response);
    setUserInfo(response);
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
  };

  // Updated to include '/profile'
  const isAuthPage = 
    location.pathname === '/upload' || 
    location.pathname === '/signin' || 
    location.pathname === '/signup' || 
    location.pathname === '/reset-password' || 
    location.pathname.includes('/reset-password-confirm') ||
    location.pathname === '/profile';  // Exclude ProfilePage from rendering Navbar/Footer

  const isImagePage = location.pathname.includes('/image/');
  const isContactPage = location.pathname === '/contact'; 
  const isAboutPage = location.pathname === '/about'; 

  return (
    <GoogleOAuthProvider clientId="813199410523-cc8t4holtdod284p9kcqqlbunb7rqdrt.apps.googleusercontent.com">
      <div>
        {/* Render Navbar only if not on auth/image/contact/about/profile pages */}
        {!isAuthPage && !isImagePage && !isContactPage && !isAboutPage && (
          <Navbar 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            setSelectedCategory={setSelectedCategory} 
            setSearchQuery={setSearchQuery} 
          />
        )}
        <div className="App">
          <Routes>
            <Route path="/" element={<WallpaperList selectedCategory={selectedCategory} searchQuery={searchQuery} />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/signin" element={<SignIn setUserInfo={setUserInfo} />} />
            <Route path="/image/:id" element={<ImageDetails />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password-confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        {/* Render Footer only if not on auth/image/contact/about/profile pages */}
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
