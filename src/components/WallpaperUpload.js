import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageList = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get('http://localhost:8000/api/images/');
            setImages(response.data);
        };
        fetchImages();
    }, []);

    return (
        <div>
            {images.map((image) => (
                <img key={image.id} src={`http://localhost:8000${image.image}`} alt={`Uploaded ${image.id}`} style={{ width: '200px', margin: '10px' }} />
            ))}
        </div>
    );
};

export default ImageList;
