import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ username: '', bio: '', profile_picture: '' });
    const [editMode, setEditMode] = useState(false);

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/profile/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
                navigate('/signin');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    // Handle profile picture change
    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setUserInfo((prevInfo) => ({ ...prevInfo, profile_picture: file }));
    };

    // Save updated profile
    const handleSave = async () => {
      const formData = new FormData();
      formData.append('username', userInfo.username);
      formData.append('bio', userInfo.bio);
      if (userInfo.profile_picture instanceof File) {
          formData.append('profile_picture', userInfo.profile_picture);
      }
  
      try {
          const response = await axios.put('/api/profile/', formData, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'multipart/form-data',
              }
          });
          console.log("Profile updated successfully:", response.data);  // Debug line
          setUserInfo(response.data);
          setEditMode(false);
      } catch (error) {
          console.error("Failed to update profile", error);  // Log full error
          if (error.response) {
              console.log("Error status:", error.response.status);
              console.log("Error data:", error.response.data);
          }
      }
  };
  

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/signin');
    };

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profile-picture">
                <img
                    src={userInfo.profile_picture || '/default-profile.png'}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                {editMode && (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                            style={{ marginTop: '10px' }}
                        />
                        <p style={{ marginTop: '5px' }}>Change Profile Picture</p>
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
                        placeholder="Enter your username"
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
            <button className="profile-btn" onClick={() => navigate('/')} style={{ marginTop: '10px' }}>Back to Home</button>
        </div>
    );
};

export default ProfilePage;
