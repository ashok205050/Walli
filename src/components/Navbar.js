import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import WallpaperList from './WallpaperList';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(''); // State to hold the username

  // Check for user info in local storage
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    const savedUsername = localStorage.getItem('username'); // Get the username from local storage
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
    if (savedUsername) {
      setUsername(savedUsername); // Set the username state
    }
  }, []);

  // Toggle visibility of categories menu
  const toggleCategories = (event) => {
    event.stopPropagation();
    setCategoriesVisible(!isCategoriesVisible);
    document.body.classList.toggle('no-scroll', !isCategoriesVisible);
  };

  // Close the categories menu
  const closeCategories = () => {
    if (isCategoriesVisible) {
      setCategoriesVisible(false);
      document.body.classList.remove('no-scroll');
    }
  };

  // Handle category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');  // Clear search when selecting a category
    navigate(`/?category=${category}`); // Sync category selection with URL
    closeCategories(); // Close category menu
  };

  // Handle search submission
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/?search=${searchQuery}`); // Update URL with the search query
  };

  // Logout handler
  const handleLogout = () => {
    setUserInfo(null);
    setUsername(''); // Clear the username state
    localStorage.removeItem('userInfo'); // Remove user info from local storage
    localStorage.removeItem('username'); // Remove username from local storage
  };

  // Sync with URL parameters for categories and search
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.categories-container') && !event.target.closest('.hamburger')) {
        closeCategories();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const searchFromUrl = params.get('search');

    // Set selected category and search query from URL
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }

    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [location.search]);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">W A L L I</Link>
        </div>
        <div className="hamburger" id="hamburgerMenu" onClick={toggleCategories}>
          <a>&#9776; <span>Categories</span></a>
        </div>
        <div
          id="categoriesContainer"
          className={`categories-container ${isCategoriesVisible ? '' : 'hidden'}`}
        >
          <ul id="categoriesList">
            {['Funny', 'Entertainment', 'Nature', 'Sports', 'Cars & Vehicles', 'Animals', 'Bollywood', 'Hollywood', 'Games', 'Technology', 'Music', 'Drawing', 'Brands', 'Patterns', 'Anime', 'Holiday']
              .map((category) => (
                <li key={category} onClick={() => handleCategorySelection(category)}>
                  {category}
                </li>
              ))}
          </ul>
        </div>
        {/* Main Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search W A L L I"
              aria-label="Search"
            />
            <button type="submit" aria-label="Search Button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="credentials">
          <a href="#" id="upload-button">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span> Upload</span>
          </a>
          {userInfo ? (
            <div className="user-info">
              <img src={userInfo.picture} alt="Profile" className="profile-picture" />
              <span>Welcome, {username}</span> {/* Display username here */}
              <a onClick={handleLogout} href="#">Logout</a>
            </div>
          ) : (
            <a onClick={() => navigate('/signin')} href="#">
              <i className="fa-regular fa-user"></i>
              <span> Sign in</span>
            </a>
          )}
        </div>
      </nav>

      {/* Secondary search bar for smaller screens */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search W A L L I"
            aria-label="Search"
          />
          <button type="submit" aria-label="Search Button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
