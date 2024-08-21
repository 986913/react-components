import React, {useState, useEffect, useRef} from 'react';
import './slider.css';


export const Slider = ({initial, max, onChange}) => {
  const sliderRef = useRef();
  const thumbRef = useRef();
  const diffRef = useRef();


  const getPercentage = (current, max) => (100 * current) / max;
  
  const initialPercentage = getPercentage(initial, max);

  const getValue = (percentage, max) => (max / 100) * percentage;
  const getLeft = percentage => `calc(${percentage}% - 5px)`;

  const handleMouseMove = (e) => {
    let newX = e.clientX - diffRef.current - sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    const start = 0;
    if(newX<start) newX = 0;
    if(newX>end) newX = end;

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max).toFixed(0)
    thumbRef.current.style.left = getLeft(newPercentage);
    onChange(newValue);
  }
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  }
  const handleOnMouseDown = (e) => {
    diffRef.current = e.clientX - thumbRef.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }


  return (
    <div className='sidebar-outter' ref={sliderRef}>
        <div className='sidebar-inner'>
            <span 
              className='thumb' 
              ref={thumbRef} 
              style={{left: getLeft(initialPercentage) }} 
              onMouseDown={handleOnMouseDown} >
            </span>
        </div>
    </div>
  )
}