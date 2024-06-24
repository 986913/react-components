import React from 'react';
import './progressbar.css';

const MIN = 0;
const MAX = 100;

export const ProgressBar = ({ value }) => {
  // handle invalid values and convert them to be within [0, 100]
  const clampedValue = Math.min(Math.max(value, MIN), MAX);

  return (
    <div className='progress'>
      <div
        className='inner'
        style={{ transform: `scaleX(${value}%)` }}
        role='progressbar'
        aria-valuenow={clampedValue}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
      >
        {`${clampedValue} %`}
      </div>
    </div>
  );
};
