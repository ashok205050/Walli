import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import './Navbar.css';
import WallpaperList from './WallpaperList';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState(null); // State to hold user info

  // Check for user info in local storage
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  // Toggles the visibility of categories in the menu
  const toggleCategories = (event) => {
    event.stopPropagation();
    setCategoriesVisible(!isCategoriesVisible);
    document.body.classList.toggle('no-scroll', !isCategoriesVisible);
  };

  // Closes the categories list
  const closeCategories = () => {
    if (isCategoriesVisible) {
      setCategoriesVisible(false);
      document.body.classList.remove('no-scroll');
    }
  };

  // Handles category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');  // Clear search when selecting a category
    navigate(`/?category=${category}`); // Sync category selection with URL
    closeCategories(); // Close category menu
  };

  // Handles search submission
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/?search=${searchQuery}`);  // Update URL with the search query
  };

  // Handles Google Sign-In success
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    setUserInfo(decoded); // Set user info in state
    localStorage.setItem('userInfo', JSON.stringify(decoded)); // Save user info to local storage
  };

  // Handles Google Sign-In error
  const handleLoginError = () => {
    alert('Login Failed. Please try again.');
  };

  // Logout handler
  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo'); // Remove user info from local storage
  };

  // Syncs the component with URL parameters for categories and search
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.categories-container') && !event.target.closest('.hamburger')) {
        closeCategories();
      }
    };

    // Listen for clicks outside of the category menu to close it
    document.addEventListener('click', handleDocumentClick);

    // Get the category and search query from the URL on component mount
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const searchFromUrl = params.get('search');

    // Set the selected category if found in the URL
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }

    // Set the search query if found in the URL
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
          <Link to="#">W A L L I</Link>
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
          {userInfo ? ( // Display user info if logged in
            <div className="user-info">
              <img src={userInfo.picture} alt="Profile" className="profile-picture" />
              <span>Welcome, {userInfo.name}</span>
              <a onClick={handleLogout} href="#">Logout</a> {/* Logout functionality */}
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              render={({ onClick }) => (
                <a onClick={onClick} href="#">
                  <i className="fa-regular fa-user"></i>
                  <span> Sign in</span>
                </a>
              )}
            />
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

      {/* Secondary Navbar to display the selected category */}
      <div className="secondary-navbar">
        Wallpapers {selectedCategory && ` / ${selectedCategory}`}
      </div>

      {/* Render WallpaperList with both category and search query */}
      <WallpaperList selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </header>
  );
};

export default Navbar;
