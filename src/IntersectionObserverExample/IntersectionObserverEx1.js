import React, { useRef, useState, useEffect } from 'react';
import './example.css';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0, // 可以改变阈值从0到1之间来回试试效果
};

export const IntersectionObserverEx1 = () => {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const cbFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(cbFunction, options);
    if (containerRef.current) obs.observe(containerRef.current);

    return () => {
      if (containerRef.current) obs.unobserve(containerRef.current);
    };
  }, [options, containerRef]);

  return (
    <div className='example1-container'>
      <div className='isVisible'>
        {isVisible ? 'IN Viewport' : 'NOT in Viewport'}
      </div>
      <div className='example1-section'></div>
      <div ref={containerRef} className='example1-box'>
        我是被观测的元素：containerRef
      </div>
    </div>
  );
};
