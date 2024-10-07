// CategorySelector.js
import React from 'react';

const categories = [
  { value: '', label: 'All' },
  { value: 'nature', label: 'Nature' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'technology', label: 'Technology' },
  { value: 'space', label: 'Space' },
  { value: 'animals', label: 'Animals' },
  { value: 'art', label: 'Art' },
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="category-selector">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
