import React, { useState } from 'react';
import './pagination.css';

export const Pagination = ({ totalPages, paginationSize, callbackFn }) => {
  const [currPageNo, setCurrPageNo] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const createPages = () => {
    let liArr = [];

    if (totalPages <= paginationSize) {
      for (let i = 1; i <= totalPages; i++) {
        liArr.push(
          <li key={i} className={currPageNo === i ? 'current' : ''}>
            {i}
          </li>
        );
      }
    } else {
      if (totalPages - startPage > paginationSize && startPage !== 1) {
        liArr.push(
          <li
            key={1}
            onClick={() => go(1)}
            className={currPageNo === 1 ? 'current' : ''}
          >
            {1}
          </li>
        );
        liArr.push(<li key={-2}> ... </li>);
      }

      for (let i = startPage; i <= startPage + paginationSize - 1; i++) {
        if (i < totalPages) {
          liArr.push(
            <li
              key={i}
              className={currPageNo === i ? 'current' : ''}
              onClick={() => {
                go(i);
              }}
            >
              {i}
            </li>
          );
        }
      }

      if (totalPages - startPage > paginationSize) {
        liArr.push(<li key={-1}> ... </li>);
      }

      liArr.push(
        <li
          key={totalPages}
          onClick={() => go(totalPages)}
          className={currPageNo === totalPages ? 'current' : ''}
        >
          {totalPages}
        </li>
      );
    }

    return liArr;
  };

  const go = (currPageNo) => {
    // 点击next
    if (currPageNo % paginationSize === 1) setStartPage(currPageNo);

    // 点击prev
    if (currPageNo % paginationSize === 0)
      setStartPage(currPageNo - paginationSize + 1);
    // 点击last item
    if (currPageNo === totalPages && currPageNo % paginationSize !== 0)
      setStartPage(currPageNo - (currPageNo % paginationSize) + 1);

    setCurrPageNo(currPageNo);
    callbackFn(currPageNo);
  };

  const handleNext = () => go(currPageNo + 1);
  const handlePrev = () => go(currPageNo - 1);
  const goFirstPage = () => go(1);
  const goLastPage = () => go(totalPages);

  return (
    <div className='pagi-container'>
      <button
        onClick={goFirstPage}
        className={currPageNo === 1 ? 'disable' : ''}
      >
        First Page
      </button>
      <button
        onClick={handlePrev}
        className={currPageNo === 1 ? 'disable' : ''}
      >
        prev
      </button>

      <ul className='pages-nums-container'>{createPages()}</ul>

      <button
        onClick={handleNext}
        className={currPageNo === totalPages ? 'disable' : ''}
      >
        next
      </button>
      <button
        onClick={goLastPage}
        className={currPageNo === totalPages ? 'disable' : ''}
      >
        Last Page
      </button>
    </div>
  );
};
