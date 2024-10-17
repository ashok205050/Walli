import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setSelectedCategory, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]); // Store multiple selected categories
  const [isLogoutVisible, setLogoutVisible] = useState(false);

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
    const categoriesFromUrl = params.get('category')?.split(',') || []; // Handle multiple categories
    const searchFromUrl = params.get('search') || '';

    setSelectedCategories(categoriesFromUrl);
    setSearchQueryInput(searchFromUrl);
    setSearchQuery(searchFromUrl);
    setSelectedCategory(categoriesFromUrl.join(',')); // Pass the categories as a comma-separated string
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
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    navigate(`/?category=${updatedCategories.join(',')}`); // Navigate with selected categories
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchQueryInput);
    navigate(`/?search=${searchQueryInput}`);
  };

  const handleSecondarySearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchQueryInput);
    navigate(`/?search=${searchQueryInput}`);
  };

  const handleLogout = () => {
    setUserInfo(null);
    setUsername('');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('username');
    setLogoutVisible(false);
  };

  const handleUploadClick = () => {
    if (userInfo) {
      navigate('/upload');
    } else {
      navigate('/signin');
    }
  };

  const handleDocumentClick = (event) => {
    const categoriesContainer = document.querySelector('.categories-container');
    const hamburger = document.querySelector('.hamburger');

    if (
      isCategoriesVisible &&
      !categoriesContainer.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeCategories();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isCategoriesVisible]);

  const toggleLogoutVisibility = () => {
    setLogoutVisible((prevState) => !prevState);
  };

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
                <li key={category}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategorySelection(category)}
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="input-with-button">
              <input
                type="text"
                value={searchQueryInput}
                onChange={(e) => setSearchQueryInput(e.target.value)}
                placeholder="Search W A L L I"
                aria-label="Search"
              />
              <button type="submit" aria-label="Search Button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="credentials">
          <a href="#" id="upload-button" onClick={handleUploadClick}>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span id='upload-txt'> Upload</span>
          </a>
          {userInfo ? (
            <div className="user-info">
              <img src={userInfo.picture} alt="Profile" className="profile-picture" />
              <span onClick={() => navigate('/profile')}>{username}</span>
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
            onChange={(e) => setSearchQueryInput(e.target.value)}
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
        <div className="navbar-content">
          <span>Wallpapers</span>
          {selectedCategories.length > 0 && <span className="separator"> / </span>}
          {selectedCategories.map((category, index) => (
            <span key={index} className="selected-category">
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {index < selectedCategories.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
