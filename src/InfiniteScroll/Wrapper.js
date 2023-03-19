import React from 'react';
import { useState, useEffect } from 'react';
import { InfiniteScroll } from './InfiniteScroll';

export const InfiniteScrollWrapper = () => {
  const [photos, setPhtotos] = useState([]);

  useEffect(() => {
    fetchPhotosData(0);
  }, []);

  const fetchPhotosData = (pageNo = 0) => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNo}&_limit=10`
    )
      .then((res) => res.json())
      .then((res) => setPhtotos([...photos, ...res]));
  };

  const loadMore = (newPageNo) => fetchPhotosData(newPageNo);

  return (
    <div className='App'>
      <InfiniteScroll loadMore={loadMore} height={800}>
        {photos.map((p) => (
          <img
            key={p.id + Math.random() * 10}
            src={p.url}
            alt={p.title}
            className='photo'
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
