import React, { useState, useEffect, useRef, useCallback } from 'react';
import './infinitescoll.css';

export const InfiniteScroll = ({ children, loadMore }) => {
  let [curPage, setCurPage] = useState(0);
  const bottomObserverRef = useRef();

  /******** IntersectionObserver callback function ********/
  const observerCallback = (entities, observer) => {
    const [entry] = entities;
    // If the bottom element is intersecting with the viewport:
    if (entry.isIntersecting) {
      setCurPage((prevPageNo) => {
        const nextPageNo = prevPageNo + 1;
        loadMore(nextPageNo);

        console.log('当前page is', nextPageNo);
        return nextPageNo;
      });
    }
  };

  // Memoizes observerCallback to avoid unnecessary recreations unless loadMore changes.
  const memoizedObserverCallback = useCallback(observerCallback, [loadMore]);

  /******** Set up IntersectionObserver in useEffect ********/
  useEffect(() => {
    const observer = new IntersectionObserver(memoizedObserverCallback, {
      threshold: 1.0,
    });

    const currElement = bottomObserverRef.current;
    if (currElement) {
      observer.observe(currElement);
    }

    return () => {
      if (currElement) {
        observer.unobserve(currElement);
      }
    };
  }, [memoizedObserverCallback]);

  return (
    <div className='infinite-scroll-viewport'>
      {children.map((item, idx) => {
        const { id, thumbnailUrl } = item;
        return (
          <img
            src={thumbnailUrl}
            key={`${id}-${idx}`}
            className='infinite-scroll-item'
            alt='image'
          />
        );
      })}

      <div className='bottom-observer' ref={bottomObserverRef}>
        Load More
      </div>
    </div>
  );
};
