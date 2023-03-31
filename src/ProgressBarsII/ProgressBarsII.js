import React, { useState, useEffect } from 'react';
import './progressbarsII.css';

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');

const ProgressBarII = ({ duration, isEmpty, onCompleted }) => {
  const [startTransition, setStartTransition] = useState(false);

  // diff ---> Start transition when the bar is no longer empty.
  useEffect(() => {
    if (isEmpty || startTransition) return;
    setStartTransition(true);
  });

  return (
    <div className='progress-outterII'>
      <div
        style={{ transitionDuration: `${duration}ms` }}
        className={classNames(
          'progress-innerII',
          startTransition && 'bar-filledII'
        )}
        /* key point is here❗, use 🟡onTransitionEnd props to detect when a CSS transition is complete */
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
            duration={1000}
            isEmpty={index > numFilledUpBars} // <-- diff
            onCompleted={() => {
              setNumFilledUpBars(numFilledUpBars + 1); // <-- diff
            }}
          />
        ))}
      </div>
    </div>
  );
};
