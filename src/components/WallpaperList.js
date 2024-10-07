import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './WallpaperList.css';

const WallpaperList = ({ selectedCategory, searchQuery }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30); // Number of wallpapers to display initially

  useEffect(() => {
    const fetchWallpapers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/wallpapers/');
        const data = await response.json();
        
        setWallpapers(data.results); // Assuming the wallpapers are in data.results
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []);

  // Filter wallpapers based on selected category and search query
  const filteredWallpapers = wallpapers.filter((wallpaper) => {
    const matchesCategory = selectedCategory ? wallpaper.category === selectedCategory : true;
    const matchesSearch = searchQuery ? wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  // Load more wallpapers
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 30); // Increase visible count by 30
  };

  return (
    <div className="wallpaper-container">
      {loading && <p>Loading...</p>}
      {filteredWallpapers.length > 0 ? (
        filteredWallpapers.slice(0, visibleCount).map((wallpaper) => (
          <div className="wallpaper-item" key={wallpaper.id}>
            <Link to={`/image/${wallpaper.id}`}>
              <img src={wallpaper.image} alt={wallpaper.title} />
            </Link>
          </div>
        ))
      ) : (
        !loading && null // Don't display anything if there are no wallpapers and not loading
      )}
      
      {/* Show Load More button if there are more wallpapers to show */}
      {filteredWallpapers.length > visibleCount && (
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
