import React, { useState, useEffect } from 'react';
import './progressbarsII.css';

const classNames = (...args) => args.filter(Boolean).join(' ');

const ProgressBarII = ({ isEmpty, onCompleted }) => {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition when the bar is no longer empty.
  useEffect(() => {
    if (isEmpty || startTransition) return;
    setStartTransition(true);
  });

  return (
    <div className='progress-outter'>
      <div
        className={classNames(
          'progress-inner',
          startTransition && 'bar-filled'
        )}
        /* key point is here, use onTransitionEnd props to detect when a CSS transition is complete */
        onTransitionEnd={() => {
          onCompleted();
        }}
      ></div>
    </div>
  );
};

export const ProgressBarsII = () => {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  const handleClick = () => setBars(bars + 1);
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div>
        {Array.from({ length: bars }).map((_, index) => (
          <ProgressBarII
            key={index}
            isEmpty={index > numFilledUpBars}
            onCompleted={() => {
              setNumFilledUpBars(numFilledUpBars + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};
