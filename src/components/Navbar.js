import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Event handler for toggling the categories container visibility
  const toggleCategories = (event) => {
    event.stopPropagation(); // Stop event from bubbling up
    setCategoriesVisible(!isCategoriesVisible);
    document.body.classList.toggle('no-scroll', !isCategoriesVisible); // Prevent/allow background scrolling
  };

  // Event handler for closing the categories container
  const closeCategories = () => {
    if (isCategoriesVisible) {
      setCategoriesVisible(false);
      document.body.classList.remove('no-scroll'); // Allow background scrolling
    }
  };

  // Handle category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    closeCategories(); // Hide categories container
  };

  // Attach and clean up event listeners for document clicks
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Close categories container if clicked outside of it
      if (!event.target.closest('.categories-container') && !event.target.closest('.hamburger')) {
        closeCategories();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isCategoriesVisible]);

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
            {['Funny', 'Entertainment', 'Nature', 'Sports', 'Cars & Vehicles', 'Animals', 'Bollywood', 'Hollywood', 'Games', 'Technology', 'Music', 'Drawing', 'Brands', 'Patterns', 'Anime', 'Holiday'].map(category => (
              <li key={category} onClick={() => handleCategorySelection(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search W A L L I" aria-label="Search" />
          <button type="submit" aria-label="Search Button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="credentials">
          <a href="#" id="upload-button">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span> Upload</span>
          </a>
          <a href="#">
            <i className="fa-regular fa-user"></i>
            <span> Sign in</span>
          </a>
        </div>
      </nav>

      <div className="search-bar">
        <input type="text" placeholder="Search W A L L I" aria-label="Search" />
        <button type="submit" aria-label="Search Button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="secondary-navbar">
        Wallpapers {selectedCategory && ` / ${selectedCategory}`}
      </div>
    </header>
  );
};

export default Navbar;
