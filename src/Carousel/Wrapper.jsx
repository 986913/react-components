import React from 'react';
import { useState, useEffect } from 'react';
import { Carousel } from './Carousel';

export const CarouselWrapper = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  
  return  <Carousel images={data}  />
};
