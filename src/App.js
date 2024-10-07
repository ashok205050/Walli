import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WallpaperList from './components/WallpaperList';
import WallpaperUpload from './components/WallpaperUpload';
import ImageDetails from './components/ImageDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategorySelector from './components/CategorySelector';
import ContactForm from './components/ContactForm'; 
import Aboutus from './components/Aboutus';
import SignIn from './components/SignIn'; // Import SignIn component
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import SignUp from './components/SignUp'; // Import SignUp component

const App = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Google Sign-In Success Handler
  const handleGoogleSuccess = (response) => {
    console.log('Google Sign-In Success:', response);
    setUserInfo(response);
  };

  // Google Sign-In Failure Handler
  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
  };

  // Determine whether to show the Navbar and Footer based on the current route
  const isAuthPage = 
    location.pathname === '/upload' || 
    location.pathname === '/signin' || 
    location.pathname === '/signup'; // Include signup

  const isImagePage = location.pathname.includes('/image/');
  const isContactPage = location.pathname === '/contact'; 
  const isAboutPage = location.pathname === '/about'; 

  return (
    <GoogleOAuthProvider clientId="508427224480-akif3jf54m5l6p930eb32eqilh5fja7d.apps.googleusercontent.com">
      {/* Wrap your app inside GoogleOAuthProvider and pass your Google Client ID */}
      <>
        {!isAuthPage && !isImagePage && !isContactPage && !isAboutPage && (
          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
        <div className="App">
          {!isAuthPage && !isContactPage && !isAboutPage && ( 
            <CategorySelector 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          )}
          <Routes>
            <Route path="/" element={<WallpaperList selectedCategory={selectedCategory} />} />
            <Route path="/upload" element={<WallpaperUpload />} />
            <Route path="/signin" element={<SignIn setUserInfo={setUserInfo} />} /> {/* Keep existing SignIn Route */}
            <Route path="/image/:id" element={<ImageDetails />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/signup" element={<SignUp />} /> {/* Keep existing SignUp Route */}
          </Routes>
        </div>
        {!isAuthPage && !isImagePage && !isContactPage && !isAboutPage && <Footer />}
      </>
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
