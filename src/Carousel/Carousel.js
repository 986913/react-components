import React from 'react';
import './carousel.css';
import { useState } from 'react';

/**
 *
 * Carousel component:
 *  2 props: dataSource, viewWidth
 *  1 state: currentIndex
 *
 */
export const Carousel = ({ dataSource, viewWidth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewPortStyle = {
    width: viewWidth + 'px',
  };
  // key point is here: translateX用来左右平移
  const containerStyle = {
    transform: 'translateX(' + currentIndex * 150 + 'px)',
  };

  const handleNext = () => setCurrentIndex(currentIndex - 1);
  const handlePrev = () => setCurrentIndex(currentIndex + 1);

  return (
    <div className='viewport' style={viewPortStyle}>
      <ul className='container' style={containerStyle}>
        {dataSource.map((data) => {
          return (
            <li key={data.id}>
              <img src={data.thumbnailUrl} alt={data.title} />
            </li>
          );
        })}
      </ul>
      <button
        className='btn left-btn'
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        prev
      </button>
      <button
        className='btn right-btn'
        onClick={handleNext}
        disabled={currentIndex === dataSource.length - 1}
      >
        next
      </button>
    </div>
  );
};
