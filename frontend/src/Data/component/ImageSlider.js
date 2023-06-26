import React, { useState, useEffect } from 'react';
import './imageslider.css';

const ImageSlider = ({ images, width, height }) => {
  const [currentPage, setCurrentPage]   = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % images.length);
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className                      = "imageslider-image">
      <img
        src                             = {images[currentPage]}
        alt                             = "Slider"
        style                           = {{ width, height }}
        className                       = "imageslider-animation"
      />
    </div>
  );
};

export default ImageSlider;
