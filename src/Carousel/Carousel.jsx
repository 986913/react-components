import React from 'react';
import './carousel.css';
import { useState } from 'react';


export const Carousel = ({ images }) => {
  const [currIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex(currIndex + 1);
  const goPrev = () => setCurrentIndex(currIndex - 1);

  return (
    <div className='Carousel-container'>
      <ul 
        className='imgs-container' 
        //!重点在这里：transfrom:translateX(-多少px) ---> 用来向左平移
        style={{ transform: `translateX(-${currIndex * 150}px)`}}>
          {images.map((data) => {
            return (
              <li key={data.id}>
                <img src={data.thumbnailUrl} alt={data.title} />
              </li>
            )
          })}
      </ul>

      <button
        className='btn left-btn'
        onClick={goPrev}
        disabled={currIndex === 0}
        aria-label="Previous image"
      >
        prev
      </button>
      <button
        className='btn right-btn'
        onClick={goNext}
        disabled={currIndex === images.length - 1}
        aria-label="Next image"
      >
        next
      </button>
    </div>
  );
};
