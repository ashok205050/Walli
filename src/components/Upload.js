import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to upload images.');
      navigate('/signin');
    }
  }, [navigate]);

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

    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to upload images.');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Decode and check token expiry
    if (token.split('.').length === 3) { // Ensure it's a valid JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
    } else {
      alert('Invalid token. Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    console.log('Token being sent:', token);

    // Step 1: Upload the file to Firebase
    const storageRef = ref(storage, `wallpapers/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Step 2: Prepare data to send to Django
      const formData = {
        image: downloadURL,
        title,
        description,
        tags,
      };

      console.log('Data to be sent to backend:', formData);

      // Step 3: Send the data to your Django backend
      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        alert('You are not authorized. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (response.ok) {
        alert('Image uploaded successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('Error uploading image: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Upload error:', error);
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
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
