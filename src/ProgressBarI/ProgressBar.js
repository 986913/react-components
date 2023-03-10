import React from 'react';
import './progressbar.css';

export const ProgressBar = ({ progress }) => {
  return (
    <div className='outter'>
      {/* key point: θ¦η¨ π‘ transform: scaleX(ηΎεζ°%)*/}
      <div className='inner' style={{ transform: `scaleX(${progress / 100})` }}>
        {`${Math.floor(progress)}%`}
      </div>
    </div>
  );
};
