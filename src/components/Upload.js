import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // State for logged-in username
  const navigate = useNavigate();

  // Sample categories
  const categories = ['Nature', 'Animals', 'Technology', 'Art', 'Abstract'];

  useEffect(() => {
    // Fetch the logged-in user's information (mock implementation)
    const fetchUser = async () => {
      // Replace this with your actual user fetching logic
      const user = { username: 'current_user' }; // Example user
      setUsername(user.username);
    };

    fetchUser();
  }, []);

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

      // Step 2: Prepare form data to send to Django
      const formData = new FormData();
      formData.append('image', downloadURL); // Add the Firebase image URL
      formData.append('title', title); // Add the title
      formData.append('description', description); // Add the description
      formData.append('tags', tags); // Add the tags
      formData.append('category', category); // Add the selected category
      formData.append('uploaded_by', username); // Add the username of the logged-in user

      // Step 3: Send the data to your Django backend
      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        body: formData, // Send as FormData
      });

      // Handle the response
      if (response.ok) {
        alert('Image uploaded successfully!'); // Show success message
        navigate('/'); // Navigate back to the main page
      } else {
        const errorData = await response.json();
        alert('Error uploading image: ' + JSON.stringify(errorData)); // Handle errors
      }
    } catch (error) {
      console.error('Upload error:', error); // Log the error for better debugging
      alert('An error occurred: ' + error.message); // Show error message
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <p>Uploaded By: {username}</p> {/* Display the username of the logged-in user */}
        <button type="submit" disabled={loading}>Upload</button> {/* Disable button during loading */}
      </form>
    </div>
  );
};

export default Upload;
