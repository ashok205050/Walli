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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const CATEGORY_CHOICES = [
    { value: 'nature', label: 'Nature' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'technology', label: 'Technology' },
    { value: 'space', label: 'Space' },
    { value: 'animals', label: 'Animals' },
    { value: 'art', label: 'Art' },
    { value: 'funny', label: 'Funny' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'cars & vehicles', label: 'Cars & Vehicles' },
    { value: 'bollywood', label: 'Bollywood' },
    { value: 'hollywood', label: 'Hollywood' },
    { value: 'games', label: 'Games' },
    { value: 'music', label: 'Music' },
    { value: 'patterns', label: 'Patterns' },
    { value: 'anime', label: 'Anime' },
    { value: 'holiday', label: 'Holiday' },
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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Remove category if already selected
        return prevCategories.filter((c) => c !== category);
      } else {
        // Add category to the list
        return [...prevCategories, category];
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
      formData.append('category', JSON.stringify(selectedCategories)); // Send categories as an array
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
            <label key={choice.value}>
              <input
                type="checkbox"
                value={choice.value}
                checked={selectedCategories.includes(choice.value)}
                onChange={() => handleCategoryChange(choice.value)}
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
