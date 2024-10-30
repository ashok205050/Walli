import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WallpaperList.css';

const CACHE_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const WallpaperList = () => {
  const location = useLocation();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
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

      // Save to localStorage
      localStorage.setItem('wallpapers', JSON.stringify(sortedWallpapers));
      localStorage.setItem('category', category);
      localStorage.setItem('searchQuery', search);
      localStorage.setItem('visibleCount', visibleCount.toString());
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'all';
    const searchFromUrl = params.get('search') || '';

    const cachedWallpapers = localStorage.getItem('wallpapers');
    const cachedVisibleCount = localStorage.getItem('visibleCount') || '24';
    const cachedCategory = localStorage.getItem('category');
    const cachedSearchQuery = localStorage.getItem('searchQuery');

    if (
      cachedWallpapers &&
      cachedCategory === categoryFromUrl &&
      cachedSearchQuery === searchFromUrl
    ) {
      setWallpapers(JSON.parse(cachedWallpapers));
      setVisibleCount(Number(cachedVisibleCount));
    } else {
      fetchWallpapers(categoryFromUrl, searchFromUrl);
    }

    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);

    // Set up cache refresh interval
    const intervalId = setInterval(() => {
      localStorage.clear();
      sessionStorage.clear();
      fetchWallpapers(categoryFromUrl, searchFromUrl);
    }, CACHE_REFRESH_INTERVAL);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [location.search]);

  const loadMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 20;
      return newCount > wallpapers.length ? wallpapers.length : newCount;
    });

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
