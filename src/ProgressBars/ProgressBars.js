import React, { useState, useEffect } from 'react';
import './progressbars.css';

const ProgressBar = ({ duration }) => {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition after first render and never  apply this effect ever again.
  useEffect(() => {
    if (startTransition) return;
    setStartTransition(true);
  });

  return (
    <div className='progress-outter'>
      <div
        style={{ transitionDuration: `${duration}ms` }}
        className={['progress-inner', startTransition && 'bar-filled']
          .filter(Boolean)
          .join(' ')}
      ></div>
    </div>
  );
};

export const ProgressBars = () => {
  const [bars, setBars] = useState(0);
  const handleClick = () => setBars(bars + 1);
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div>
        {Array.from({ length: bars }).map((_, index) => (
          // duration props: how much time to take to running whole bar (ms as unit)
          <ProgressBar key={index} duration={4000} />
        ))}
      </div>
    </div>
  );
};
