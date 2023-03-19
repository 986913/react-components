import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';

export const PaginationWrapperI = () => {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [countsPerPage, setCountsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setList(json);
        setDisplayList(json.slice(0, countsPerPage));
      });
  }, []);

  useEffect(() => {
    setDisplayList(list.slice(0, countsPerPage));
  }, [list, countsPerPage]);

  const updateList = (itemsCounts, currPage) => {
    const newList = list.slice(
      itemsCounts * (currPage - 1),
      itemsCounts * currPage + 1
    );
    setDisplayList(newList);
  };

  const handleOnChange = (e) => {
    setCountsPerPage(e.target.value);
  };

  return (
    <div>
      <ul>
        {displayList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <Pagination
        totalDataCount={list.length}
        itemsPerPage={countsPerPage}
        callbackFn={(itemsCount, currPage) => updateList(itemsCount, currPage)}
      />

      <label>choose how may items to display per page: </label>
      <select value={countsPerPage} onChange={handleOnChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
      <br />
    </div>
  );
};
