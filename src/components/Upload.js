import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig';
import './Upload.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]); // This will hold category IDs
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Update CATEGORY_CHOICES to use IDs
  const CATEGORY_CHOICES = [
    { id: 1, value: 'nature', label: 'Nature' },
    { id: 2, value: 'abstract', label: 'Abstract' },
    { id: 3, value: 'technology', label: 'Technology' },
    { id: 4, value: 'space', label: 'Space' },
    { id: 5, value: 'animals', label: 'Animals' },
    { id: 6, value: 'art', label: 'Art' },
    { id: 7, value: 'funny', label: 'Funny' },
    { id: 8, value: 'entertainment', label: 'Entertainment' },
    { id: 9, value: 'sports', label: 'Sports' },
    { id: 10, value: 'cars & vehicles', label: 'Cars & Vehicles' },
    { id: 11, value: 'bollywood', label: 'Bollywood' },
    { id: 12, value: 'hollywood', label: 'Hollywood' },
    { id: 13, value: 'games', label: 'Games' },
    { id: 14, value: 'music', label: 'Music' },
    { id: 15, value: 'patterns', label: 'Patterns' },
    { id: 16, value: 'anime', label: 'Anime' },
    { id: 17, value: 'holiday', label: 'Holiday' },
  ];

  // Fetch username from local storage when component mounts
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.name) {
      setUsername(userInfo.name); // Set the username
    }
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

  const handleCategoryChange = (id) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(id)) {
        // Remove category if already selected
        return prevCategories.filter((c) => c !== id);
      } else {
        // Add category to the list
        return [...prevCategories, id];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('userInfo')); // Retrieve user info from local storage

    if (!selectedFile) {
      alert('No file selected');
      return;
    }
    if (!currentUser) {
      alert('You must be logged in to upload an image.');
      return;
    }

    setLoading(true);
    const storageRef = ref(storage, `wallpapers/${selectedFile.name}`);
    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      const formData = new FormData();
      formData.append('image', downloadURL);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('category', JSON.stringify(selectedCategories)); // Send category IDs as an array
      formData.append('uploaded_by', username); // Automatically fill "uploaded_by" with username

      const response = await fetch('https://walli-django-production.up.railway.app/api/wallpapers/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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

  const currentUser = JSON.parse(localStorage.getItem('userInfo')); // Check if the user is logged in

  if (!currentUser) {
    return <p>You must be logged in to upload images.</p>;
  }

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      {loading && <p>Uploading...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />

        {/* Checkbox for category selection */}
        <div className="category-checkboxes">
          {CATEGORY_CHOICES.map((choice) => (
            <label key={choice.id}>
              <input
                type="checkbox"
                value={choice.id}
                checked={selectedCategories.includes(choice.id)}
                onChange={() => handleCategoryChange(choice.id)} // Change to ID
              />
              {choice.label}
            </label>
          ))}
        </div>

        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Upload</button>

        {/* Automatically display the "Uploaded By" username */}
        <p>Uploaded by: {username}</p>
      </form>
    </div>
  );
};

export default Upload;
