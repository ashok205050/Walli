import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './WallpaperList.css';

const WallpaperList = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);

    fetchWallpapers(categoryFromUrl, searchFromUrl);
  }, [location.search]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    updateUrlParams(newCategory, searchQuery); // Update URL with new category and search
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    updateUrlParams(selectedCategory, searchValue); // Update URL with new search and category
  };

  const updateUrlParams = (category, search) => {
    const params = new URLSearchParams();
    if (category !== 'all') {
      params.set('category', category);
    }
    if (search) {
      params.set('search', search);
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 20;
      return newCount > wallpapers.length ? wallpapers.length : newCount;
    });
  };

  return (
    <div className="wallpaper-container">
      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="nature">Nature</option>
          <option value="technology">Technology</option>
          {/* Add more categories as needed */}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search wallpapers..."
        />
      </div>

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
