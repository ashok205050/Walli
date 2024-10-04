import React, { useEffect, useState } from 'react';
import './WallpaperList.css';

const WallpaperList = ({ selectedCategory, searchQuery }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalWallpapers, setTotalWallpapers] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallpapers = async () => {
      setLoading(true);
      try {
        const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
        const searchQueryParam = searchQuery ? `&search=${searchQuery}` : '';
        const response = await fetch(`http://127.0.0.1:8000/api/wallpapers/?page=${page}${categoryQuery}${searchQueryParam}`);
        const data = await response.json();

        if (page === 1) {
          setWallpapers(data.results);
        } else {
          setWallpapers(prev => [...prev, ...data.results]);
        }

        setTotalWallpapers(data.count);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, [selectedCategory, searchQuery, page]);

  const loadMoreWallpapers = () => {
    if (wallpapers.length < totalWallpapers) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="wallpaper-container">
      {loading && <p>Loading...</p>}

      {wallpapers.length > 0 ? (
        wallpapers.map((wallpaper) => (
          <div className="wallpaper-item" key={wallpaper.id}>
            <img src={wallpaper.image} alt={wallpaper.title} />
          </div>
        ))
      ) : (
        !loading && <p>No wallpapers found.</p>
      )}

      {wallpapers.length < totalWallpapers && !loading && (
        <div className="button-container">
          <button onClick={loadMoreWallpapers} className="load-more">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default WallpaperList;
