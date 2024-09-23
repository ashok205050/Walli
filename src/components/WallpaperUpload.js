// src/components/WallpaperUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const WallpaperUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    // Post the form data to the backend
    try {
      await axios.post('http://127.0.0.1:8000/api/wallpapers/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Wallpaper uploaded successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('There was an error uploading the wallpaper!', error);
    }
  };

  return (
    <div>
      <h2>Upload Wallpaper</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default WallpaperUpload;
