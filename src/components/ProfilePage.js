import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: '', bio: '', picture: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      navigate('/signin'); // Redirect to sign-in if not logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Save updated info to localStorage
    setEditMode(false); // Exit edit mode
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (upload) => {
      setUserInfo({ ...userInfo, picture: upload.target.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/signin'); // Redirect to sign-in page after logout
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img
          src={userInfo.picture || '/default-profile.png'} // Default profile picture
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }} // Styling for the profile picture
        />
        {editMode && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              style={{ marginTop: '10px' }} // Optional styling
            />
            <p style={{ marginTop: '5px' }}>Change Profile Picture</p> {/* Label for clarity */}
          </div>
        )}
      </div>
      <div className="profile-details">
        <label>Username:</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="Enter new username"
          />
        ) : (
          <p>{userInfo.username}</p>
        )}
        <label>Bio:</label>
        {editMode ? (
          <textarea
            name="bio"
            value={userInfo.bio}
            onChange={handleInputChange}
            placeholder="Enter your bio"
          />
        ) : (
          <p>{userInfo.bio}</p>
        )}
      </div>
      {editMode ? (
        <button className="profile-btn" onClick={handleSave}>Save</button>
      ) : (
        <button className="profile-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
      )}
      <button className="profile-btn" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      <button className="profile-btn"s onClick={() => navigate('/')} style={{ marginTop: '10px' }}>Back to Home</button>
    </div>
  );
};

export default ProfilePage;
