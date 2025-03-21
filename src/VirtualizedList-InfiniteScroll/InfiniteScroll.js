import React, { useState, useEffect, useRef, useCallback } from 'react';
import './infinitescoll.css';

export const InfiniteScroll = ({ children, loadMore }) => {
  let [curPage, setCurPage] = useState(0);
  const bottomObserverRef = useRef();

  /******** IntersectionObserver callback function ********/
  const observerCallback = (entities, observer) => {
    // 因为只有1个目标元素bottomObserverRef,所以所以 entries 通常只有1个元素，取 entries[0] 直接使用就行了：
    // If the 观察元素 is intersecting with the viewport:
    if (entities[0].isIntersecting) {
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
      observer.observe(currElement); //这里就只观察👀一个目标元素: bottomObserverRef
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
