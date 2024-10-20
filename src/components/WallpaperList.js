import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WallpaperList.css';

const WallpaperList = () => {
  const location = useLocation();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24); // Start with 24 wallpapers
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWallpapers = async (category, search) => {
    setLoading(true);
    let apiUrl = 'https://walli-django-production.up.railway.app/api/wallpapers/';
    const params = [];

    if (category !== 'all') {
      params.push(`category=${category}`);
    }
    if (search) {
      params.push(`search=${search}`);
    }

    if (params.length > 0) {
      apiUrl += '?' + params.join('&');
    }

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Sort wallpapers by uploaded_at in descending order
      const sortedWallpapers = data.results || [];
      sortedWallpapers.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      setWallpapers(sortedWallpapers);

      // Save to localStorage for preserving the state
      localStorage.setItem('wallpapers', JSON.stringify(sortedWallpapers));
      localStorage.setItem('selectedCategory', category);
      localStorage.setItem('searchQuery', search);
      localStorage.setItem('visibleCount', visibleCount.toString());
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if data is available in localStorage
    const cachedWallpapers = localStorage.getItem('wallpapers');
    const cachedCategory = localStorage.getItem('selectedCategory') || 'all';
    const cachedSearchQuery = localStorage.getItem('searchQuery') || '';
    const cachedVisibleCount = localStorage.getItem('visibleCount') || 24;

    if (cachedWallpapers) {
      // Use cached data
      setWallpapers(JSON.parse(cachedWallpapers));
      setSelectedCategory(cachedCategory);
      setSearchQuery(cachedSearchQuery);
      setVisibleCount(Number(cachedVisibleCount));
    } else {
      // Fetch data if no cache exists
      const params = new URLSearchParams(location.search);
      const categoryFromUrl = params.get('category') || 'all';
      const searchFromUrl = params.get('search') || '';

      setSelectedCategory(categoryFromUrl);
      setSearchQuery(searchFromUrl);

      fetchWallpapers(categoryFromUrl, searchFromUrl);
    }
  }, [location.search]);

  const loadMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 20;
      return newCount > wallpapers.length ? wallpapers.length : newCount;
    });

    // Update localStorage for the visibleCount when loading more
    localStorage.setItem('visibleCount', (visibleCount + 20).toString());
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
      {visibleCount < wallpapers.length && (
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
