import React, { useState, useEffect } from 'react';
import './progressbars.css';

const ProgressBar = () => {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition after first render and never  apply this effect ever again.
  useEffect(() => {
    if (startTransition) return;
    setStartTransition(true);
  });

  return (
    <div className='progress-outter'>
      <div
        className={['progress-inner', startTransition && 'bar-filled']
          .filter(Boolean)
          .join(' ')}
      ></div>
    </div>
  );
};

export const ProgressBars = ({ value }) => {
  const [bars, setBars] = useState(0);
  const handleClick = () => setBars(bars + 1);
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div>
        {Array(bars)
          .fill(null)
          .map((_, index) => (
            <ProgressBar key={index} />
          ))}
      </div>
    </div>
  );
};
