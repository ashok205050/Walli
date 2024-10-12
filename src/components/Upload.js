import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
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
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to upload images.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);

    // Log FormData for debugging
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    try {
      // Corrected endpoint for uploading images
      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });

      if (response.status === 401) {
        alert('You are not authorized. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (response.ok) {
        alert('Image uploaded successfully!');
        navigate('/'); // Navigate back to the main page
      } else {
        const errorData = await response.json();
        alert('Error uploading image: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
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
