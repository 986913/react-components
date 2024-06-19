import React from 'react';
import { useState, useEffect } from 'react';
import { InfiniteScroll } from './InfiniteScroll';

/**
 * InfiniteScrollWrapper:
      states:  
        data

    InfiniteScroll: 
      props:
        children:   array
        viewHeight : number
        callback(loadMore):  function
      states:
        pageNo: 
      
 */

export const InfiniteScrollWrapper = () => {
  let [dataList, setDataList] = useState([]);

  const fetchPhotosData = (pageNo = 0) => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNo}&_limit=10`
    )
      .then((res) => res.json())
      .then((res) => {
        //note: 这里的Update state function 接受的是function as parameter
        setDataList((prevList) => {
          return [...prevList, ...res];
        });
      });
  };

  useEffect(() => {
    fetchPhotosData();
  }, []);

  const loadMore = (newPageNo) => fetchPhotosData(newPageNo);

  return <InfiniteScroll loadMore={loadMore}>{dataList}</InfiniteScroll>;
};
