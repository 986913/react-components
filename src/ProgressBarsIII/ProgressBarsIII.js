import React, { useState, useEffect } from 'react';
import './progressbarsIII.css';

const classNames = (...args) => args.filter(Boolean).join(' ');

const ProgressBarIII = ({ isEmpty, onCompleted }) => {
  const [startTransition, setStartTransition] = useState(false);

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
        onTransitionEnd={() => {
          onCompleted();
        }}
      ></div>
    </div>
  );
};

export const ProgressBarsIII = ({ concurrencyLimit }) => {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  const handleClick = () => setBars(bars + 1);

  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div>
        {Array.from({ length: bars }).map((_, index) => (
          <ProgressBarIII
            key={index}
            isEmpty={index >= numFilledUpBars + concurrencyLimit} // <-- diff
            onCompleted={() => {
              setNumFilledUpBars(numFilledUpBars + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};