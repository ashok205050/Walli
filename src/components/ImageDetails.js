import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ImageDetails.css';

const ImageDetails = () => {
  const { id } = useParams();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallpaperDetails = async () => {
      try {
        const response = await fetch(`https://walli-django-production.up.railway.app/api/wallpapers/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched wallpaper data:", data); // Log the fetched data
        setWallpaper(data);
      } catch (error) {
        console.error("Error fetching wallpaper details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWallpaperDetails();
  }, [id]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wallpaper) {
    return <p>Wallpaper not found.</p>;
  }

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!wallpaper.image) {
      console.error("Image URL is not valid.");
      return;
    }

    try {
      const response = await fetch(wallpaper.image);
      if (!response.ok) {
        throw new Error("Failed to fetch the image.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', wallpaper.title || 'download');
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className="image-details-container">
      <img className="image" src={wallpaper.image} alt={wallpaper.title} />
      <div className="details">
        <h2>{wallpaper.title}</h2>
        <p><strong>Category:</strong> {wallpaper.category || 'N/A'}</p>
        {wallpaper.description && (
          <p><strong>Description:</strong> {wallpaper.description}</p>
        )}
        <p><strong>Uploaded At:</strong> {new Date(wallpaper.uploaded_at).toLocaleString()}</p>
        <p>
          <strong>Uploaded By:</strong> 
          {wallpaper.uploaded_by ? (
            <span>
              <img 
                src={wallpaper.uploaded_by.profile_picture || '/default-profile.png'} 
                alt="Profile" 
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} 
              />
              <a href={`/profile/${wallpaper.uploaded_by.id}`}>
                {wallpaper.uploaded_by.username} {/* This will show the username */}
              </a>
            </span>
          ) : (
            <span>N/A</span>
          )}
        </p>
        <button onClick={handleDownload} className="download-button">Download</button>
      </div>
    </div>
  );
};

export default ImageDetails;
