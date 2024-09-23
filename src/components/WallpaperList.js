// src/components/WallpaperList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WallpaperList = () => {
  const [wallpapers, setWallpapers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/wallpapers/')
      .then(response => {
        setWallpapers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the wallpapers!", error);
      });
  }, []);

  return (
    <div>
      <h2>Wallpapers</h2>
      <div className="wallpaper-list">
        {wallpapers.map(wallpaper => (
          <div key={wallpaper.id} className="wallpaper-item">
            <h3>{wallpaper.title}</h3>
  
            <img src={wallpaper.image} alt={wallpaper.title} width="300" />
            <p>{wallpaper.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallpaperList;
