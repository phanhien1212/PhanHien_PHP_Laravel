// ProductRating.js
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Lấy giá trị rating từ sessionStorage khi component được mount
    const savedRating = sessionStorage.getItem('productRating');
    if (savedRating) {
      setRating(parseInt(savedRating, 10));
      onRatingChange(parseInt(savedRating, 10));
    }
  }, [onRatingChange]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);

    // Lưu giá trị rating vào sessionStorage
    sessionStorage.setItem('productRating', newRating);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className="star"
          color={index + 1 <= rating ? '#ffc107' : '#e4e5e9'}
          size={18}
          style={{marginLeft:1}}
          onClick={() => handleRatingChange(index + 1)}
          
        />
        
      ))}
    </div>
  );
};

export default ProductRating;
