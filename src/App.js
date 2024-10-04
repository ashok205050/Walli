import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WallpaperList from './components/WallpaperList';
import WallpaperUpload from './components/WallpaperUpload';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleSignIn from './components/GoogleSignIn'; 

const App = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null); // State to hold user info

  const isAuthPage = location.pathname === '/upload' || location.pathname === '/signin';

  return (
    <>
      {!isAuthPage && <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />} {/* Pass userInfo */}
      <div className="App">
        <Routes>
          <Route path="/" element={<WallpaperList />} />
          <Route path="/upload" element={<WallpaperUpload />} />
          <Route path="/signin" element={<GoogleSignIn />} /> 
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
