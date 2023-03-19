import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';

/* 这个稍微有点bug 🔴 */

export const PaginationWrapperII = () => {
  const [list, setList] = useState([]);
  const [totalPages, setTototalPages] = useState(0);
  const [paginationSize, setPaginationSize] = useState(15);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=1'
    )
      .then((res) => res.json())
      .then((res) => {
        const { results, total_pages } = res;
        setList(results);
        setTototalPages(total_pages);
      });
  }, []);

  const updateList = (currPageNo) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=${currPageNo}`
    )
      .then((res) => res.json())
      .then((res) => {
        const { results } = res;
        setList(results);
      });
  };

  const handleOnChange = (e) => setPaginationSize(parseInt(e.target.value));

  return (
    <div>
      <section>
        <ul>
          {list.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>

        <Pagination
          totalPages={totalPages}
          paginationSize={paginationSize}
          callbackFn={(currPageNo) => updateList(currPageNo)}
        />

        <label> select size of pagination: </label>
        <select value={paginationSize} onChange={handleOnChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </section>
    </div>
  );
};
