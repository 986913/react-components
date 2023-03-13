import React from 'react';
import './progressbar.css';

export const ProgressBar = ({ progress }) => {
  return (
    <div className='outter'>
      <div className='inner' style={{ transform: `scaleX(${progress / 100})` }}>
        {`${Math.floor(progress)}%`}
      </div>
    </div>
  );
};
