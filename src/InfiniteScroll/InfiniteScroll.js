import React, { useState, useEffect, useRef } from 'react';
import './infinitescoll.css';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

export const InfiniteScroll = ({ children, loadMore }) => {
  let [loading, setLoading] = useState(false);
  let [pageNo, setPageNo] = useState(0);

  const containerRef = useRef();

  const handleObserver = (entities, observer) => {
    /* console.log('🟡IntersectionObserver callback function在目标元素出现或者消失于viewport时被call 🟡'); */
    setLoading(false);

    const [entry] = entities;
    //也就是target element (containerRef) 与viewPort交合了：
    if (entry.isIntersecting) {
      setPageNo(pageNo++);
      loadMore(pageNo);
      setLoading(true);
    }
  };

  useEffect(() => {
    // key is here: 创建IntersectionObserver实例obs, 然后obs监听target元素(containerRef)是否进入窗口
    const obs = new IntersectionObserver(handleObserver, options);
    if (containerRef.current) obs.observe(containerRef.current);

    return () => {
      if (containerRef.current) obs.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <div>
      <div className='photoBOx'>{children}</div>

      <div ref={containerRef} className='loading'>
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
};
