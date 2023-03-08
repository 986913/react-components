import React from 'react';
import { useState } from 'react';
import { StarRating } from './StarRating';

export const StarRatingWrapper = () => {
  const [rating, setRating] = useState(3);
  return (
    <div>
      <StarRating max={5} value={rating} changeValue={setRating} />
    </div>
  );
};
