import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // New state for tags
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid image file.');
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      alert('Please select a file before submitting.');
      setLoading(false);
      return;
    }

    try {
      const storageRef = ref(storage, `images/${selectedFile.name}`); // Create a reference to the file
      await uploadBytes(storageRef, selectedFile); // Upload the file

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Prepare the wallpaper data (you can adjust this based on your API)
      const wallpaperData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()), // Split and trim tags
        imageUrl: downloadURL, // URL of the uploaded image
      };

      // Here you can send wallpaperData to your backend API if needed
      // Example:
      // const response = await fetch('http://localhost:8000/api/wallpapers/upload/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify(wallpaperData),
      // });

      alert('Image uploaded successfully!');
      navigate('/'); // Navigate back to the main page
    } catch (error) {
      alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      {loading && <p>Uploading...</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
