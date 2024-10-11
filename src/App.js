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
import PrivacyPolicy from './components/PrivacyPolicy'; 
import DMCA_Copyright from './components/DMCA_Copyright';

const App = () => {
  const location = useLocation(); 
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

  // Normalize the pathname to lowercase for case-insensitive comparison
  const currentPath = location.pathname.toLowerCase();

  // Separate check for the copyright page only
  const isCopyrightPage = currentPath === '/copyright';

  // General auth-related, image, contact, about pages condition
  const isAuthPage = 
    currentPath === '/upload' || 
    currentPath === '/signin' || 
    currentPath === '/signup' || 
    currentPath === '/reset-password' || 
    currentPath.includes('/reset-password-confirm') || 
    currentPath === '/profile' || 
    currentPath === '/privacy-policy' || 
    currentPath === '/contact' || 
    currentPath === '/about'; 

  const isImagePage = currentPath.includes('/image/');

  return (
    <GoogleOAuthProvider clientId="813199410523-cc8t4holtdod284p9kcqqlbunb7rqdrt.apps.googleusercontent.com">
      <div>
        {/* Render Navbar only if not on auth/image/copyright pages */}
        {!isAuthPage && !isImagePage && !isCopyrightPage && (
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/copyright" element={<DMCA_Copyright />} /> {/* Handle copyright separately */}
          </Routes>
        </div>
        {/* Render Footer only if not on auth/image/copyright pages */}
        {!isAuthPage && !isImagePage && !isCopyrightPage && <Footer />}
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
