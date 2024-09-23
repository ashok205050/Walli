// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WallpaperList from './components/WallpaperList';
import WallpaperUpload from './components/WallpaperUpload';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<WallpaperList />} />
          <Route path="/upload" element={<WallpaperUpload />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
