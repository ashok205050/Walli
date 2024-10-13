import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig'; // Import your Firebase storage configuration
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
      navigate('/login');
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

    setLoading(true); // Show loading state

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to upload images.');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Step 1: Upload the file to Firebase
    const storageRef = ref(storage, `wallpapers/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL

      // Step 2: Prepare data to send to Django
      const formData = {
        image: downloadURL, // Use the download URL from Firebase
        title,
        description,
        tags,
      };

      // Log data for debugging
      console.log('Data to be sent to backend:', formData);

      // Step 3: Send the data to your Django backend
      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the authorization token
        },
        body: JSON.stringify(formData), // Send as JSON
      });

      // Handle the response
      if (response.status === 401) {
        const errorMessage = await response.text();
        console.error('Error response:', errorMessage); // Log the error message in the console
        alert('You are not authorized. Please log in again.');
        localStorage.removeItem('token'); // Clear token if unauthorized
        navigate('/login');
      } else if (response.ok) {
        alert('Image uploaded successfully!');
        navigate('/'); // Navigate back to the main page
      } else {
        const errorData = await response.json();
        alert('Error uploading image: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Upload error:', error); // Log the error for better debugging
      alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      {loading && <p>Uploading...</p>} {/* Show loading message */}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>} {/* Show selected file name */}
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
        <button type="submit" disabled={loading}>Upload</button> {/* Disable button during loading */}
      </form>
    </div>
  );
};

export default Upload;
