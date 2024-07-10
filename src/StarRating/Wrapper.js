import React from 'react';
import { useState } from 'react';
import { StarRating } from './StarRating';

export const StarRatingWrapper = () => {
  const [currentRating, setCurrentRating] = useState(3);
  return (
    <StarRating max={5} value={currentRating} changeValue={setCurrentRating} />
  );
};
