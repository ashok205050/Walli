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

  // Function to handle the download of the image
  const handleDownload = async (e) => {
    e.preventDefault();

    // Check if the image is served from Firebase Storage or other service
    if (wallpaper.image.includes('firebase')) {
      try {
        // Fetch the signed URL (this should be implemented in your backend to return a download URL)
        const response = await fetch(`https://YOUR_FIREBASE_FUNCTION_ENDPOINT`, {
          method: 'POST',
          body: JSON.stringify({ filePath: wallpaper.image }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        const downloadUrl = data.url;

        // Trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', wallpaper.title || 'download');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading from Firebase:", error);
      }
    } else {
      // Fallback if not Firebase: directly downloading the image
      const link = document.createElement('a');
      link.href = wallpaper.image;
      link.setAttribute('download', wallpaper.title || 'download');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          {wallpaper.uploaded_by && (
            <span>
              <img 
                src={wallpaper.uploaded_by.profile_picture || '/default-profile.png'} 
                alt="Profile" 
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} 
              />
              <a href={`/profile/${wallpaper.uploaded_by.id}`}>
                {wallpaper.uploaded_by.username}
              </a>
            </span>
          )}
        </p>
        <button onClick={handleDownload} className="download-button">Download</button>
      </div>
    </div>
  );
};

export default ImageDetails;
