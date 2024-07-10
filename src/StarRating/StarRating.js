import React, { useState } from 'react';
import './starrating.css';

/**************************************** Parent Component ***************************************/
export const StarRating = ({ max, value, changeValue }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (e, idx) => setHoveredIndex(idx + 1);
  const handleMouseLeave = (idx) => setHoveredIndex(idx);
  const handleClick = (idx) => changeValue(idx + 1); //调用父亲传来的函数

  return (
    <div>
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          tabIndex={0}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={() => handleMouseLeave(null)}
          onClick={() => handleClick(index)}
        >
          {/* key point is here: 是或的关系 */}
          <Star filled={index < hoveredIndex || index + 1 <= value} />
        </span>
      ))}
    </div>
  );
};

/**************************************** Chind Component ***************************************/
const Star = ({ filled }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('star-icon', filled && 'star-icon-filled')}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      />
    </svg>
  );
};
// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');
