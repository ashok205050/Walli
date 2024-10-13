import React, { useState } from 'react';
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

    // Step 1: Upload the file to Firebase
    const storageRef = ref(storage, `wallpapers/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile); // Upload the image to Firebase
      const downloadURL = await getDownloadURL(storageRef); // Get the download URL

      // Step 2: Prepare data to send to Django backend
      const formData = {
        image: downloadURL,  // Firebase URL for image
        title,
        description,
        tags,
      };

      console.log('Data to be sent to backend:', formData); // Log data for debugging

      // Step 3: Send data to Django backend
      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Expect JSON payload
        },
        body: JSON.stringify(formData),  // Send formData as JSON
      });

      if (response.ok) {
        alert('Image uploaded successfully!'); // Show success message
        navigate('/');  // Navigate back to the main page
      } else {
        const errorData = await response.json();
        alert('Error uploading image: ' + JSON.stringify(errorData));  // Handle errors
      }
    } catch (error) {
      console.error('Upload error:', error);  // Log the error for debugging
      alert('An error occurred: ' + error.message);  // Show error message
    } finally {
      setLoading(false);  // Hide loading state
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
