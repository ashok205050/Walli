import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WallpaperList.css';

const WallpaperList = () => {
  const location = useLocation();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Used for potential future functionality
  const [searchQuery, setSearchQuery] = useState(''); // Used for potential future functionality

  // Fetch wallpapers based on the current category and search query
  const fetchWallpapers = async (category, search) => {
    setLoading(true);
    let apiUrl = 'http://127.0.0.1:8000/api/wallpapers/';
    const params = [];

    if (category !== 'all') {
      params.push(`category=${category}`);
    }
    if (search) {
      params.push(`search=${search}`); // Ensure this uses the correct search query
    }

    if (params.length > 0) {
      apiUrl += '?' + params.join('&');
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWallpapers(data.results || []);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Read the search query and category from the URL
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'all';
    const searchFromUrl = params.get('search') || '';

    // Set the state from URL parameters
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl); // Ensure the global search query state is updated

    // Fetch wallpapers when the component mounts and when URL changes
    fetchWallpapers(categoryFromUrl, searchFromUrl);
  }, [location.search]); // Trigger fetchWallpapers when URL changes

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 30);
  };

  return (
    <div className="wallpaper-container">
      {loading && <p>Loading...</p>}
      {!loading && wallpapers.length === 0 && (
        <p>No wallpapers found for the selected category or search query.</p>
      )}
      {wallpapers.slice(0, visibleCount).map((wallpaper) => (
        <div className="wallpaper-item" key={wallpaper.id}>
          <Link to={`/image/${wallpaper.id}`}>
            <img src={wallpaper.image} alt={wallpaper.title} />
          </Link>
        </div>
      ))}
      {wallpapers.length > visibleCount && (
        <div className="button-container">
          <button onClick={loadMore} className="load-more">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default WallpaperList;
