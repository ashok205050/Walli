import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setSelectedCategory, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [searchQueryInput, setSearchQueryInput] = useState(''); // Local state for search input
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedCategory, setLocalSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    const savedUsername = localStorage.getItem('username');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Extract category and search from URL parameters on initial load
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') || 'all'; // Default to 'all'
    const searchFromUrl = params.get('search') || '';

    setLocalSelectedCategory(categoryFromUrl); // Update local selected category state
    setSearchQueryInput(searchFromUrl); // Set local search input state
    setSearchQuery(searchFromUrl); // Set the search query in App.js
    setSelectedCategory(categoryFromUrl); // Set selected category in parent component
  }, [location.search, setSelectedCategory]);

  const toggleCategories = (event) => {
    event.stopPropagation();
    setCategoriesVisible(!isCategoriesVisible);
    document.body.classList.toggle('no-scroll', !isCategoriesVisible);
  };

  const closeCategories = () => {
    if (isCategoriesVisible) {
      setCategoriesVisible(false);
      document.body.classList.remove('no-scroll');
    }
  };

  const handleCategorySelection = (category) => {
    setLocalSelectedCategory(category); // Update local selected category
    setSearchQueryInput(''); // Clear search query when category changes
    setSearchQuery(''); // Clear search query in App.js
    navigate(`/?category=${category}`); // Update URL with selected category
    closeCategories();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchQueryInput); // Set the search query in App.js
    navigate(`/?search=${searchQueryInput}`); // Update URL with search query
  };

  // Handle secondary search submission
  const handleSecondarySearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchQueryInput); // Set the search query in App.js
    navigate(`/?search=${searchQueryInput}`); // Update URL with search query
  };

  const handleLogout = () => {
    setUserInfo(null);
    setUsername('');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('username');
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest('.categories-container') && !event.target.closest('.hamburger')) {
      closeCategories();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">W A L L I</Link>
        </div>
        <div className="hamburger" id="hamburgerMenu" onClick={toggleCategories}>
          <a>&#9776; <span>Categories</span></a>
        </div>
        <div className={`categories-container ${isCategoriesVisible ? '' : 'hidden'}`}>
          <ul id="categoriesList">
            {['all', 'Funny', 'Entertainment', 'Nature', 'Sports', 'Cars & Vehicles', 'Animals', 'Bollywood', 'Hollywood', 'Games', 'Technology', 'Music', 'Drawing', 'Brands', 'Patterns', 'Anime', 'Holiday']
              .map((category) => (
                <li key={category} onClick={() => handleCategorySelection(category)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              ))}
          </ul>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQueryInput}
              onChange={(e) => setSearchQueryInput(e.target.value)} // Update local search query state
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
              <span>{username}</span> {/* Ensure this shows the username */}
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

      {/* Secondary Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSecondarySearch}>
          <input
            type="text"
            value={searchQueryInput}
            onChange={(e) => setSearchQueryInput(e.target.value)} // Update local search query state
            placeholder="Search W A L L I"
            aria-label="Search"
          />
          <button type="submit" aria-label="Search Button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      {/* Secondary Navbar */}
      <div className="secondary-navbar" id="secondaryNavbar">
        Wallpapers {selectedCategory && ` / ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
      </div>
    </header>
  );
};

export default Navbar;
