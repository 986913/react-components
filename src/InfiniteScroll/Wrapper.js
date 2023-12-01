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
      .then((res) => {
        //note: 这里的Update state function 接受的是function as parameter
        setPhtotos((prevPhotos) => {
          return [...prevPhotos, ...res];
        });
      });
  };

  const loadMore = (newPageNo) => {
    // console.log(newPageNo);
    fetchPhotosData(newPageNo);
  };

  return (
    <div className='App'>
      <InfiniteScroll loadMore={loadMore}>
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
