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
      const sortedWallpapers = data.results || [];
      sortedWallpapers.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      setWallpapers(sortedWallpapers);
      // Save wallpapers to sessionStorage
      sessionStorage.setItem('wallpapers', JSON.stringify(sortedWallpapers));
      sessionStorage.setItem('category', category);
      sessionStorage.setItem('searchQuery', search);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedWallpapers = sessionStorage.getItem('wallpapers');
    const cachedCategory = sessionStorage.getItem('category') || 'all';
    const cachedSearchQuery = sessionStorage.getItem('searchQuery') || '';

    if (cachedWallpapers) {
      // Use cached data from sessionStorage
      setWallpapers(JSON.parse(cachedWallpapers));
      setSelectedCategory(cachedCategory);
      setSearchQuery(cachedSearchQuery);
    } else {
      // If no cache, fetch the data
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
