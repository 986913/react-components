import React from 'react';
import { useState, useEffect } from 'react';
import { Carousel } from './Carousel';

export const CarouselWrapper = () => {
  const [data, setData] = useState([]);
  const [viewWidth, setWidth] = useState(450);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleOnChange = (e) => setWidth(e.target.value);
  return (
    <div>
      <label> select width of Carousel </label>
      <select value={viewWidth} onChange={handleOnChange}>
        <option value={150}> 150 </option>
        <option value={300}> 300 </option>
        <option value={450}> 450 </option>
        <option value={600}> 600 </option>
        <option value={750}> 750 </option>
      </select>

      <Carousel dataSource={data} viewWidth={viewWidth} />
    </div>
  );
};
