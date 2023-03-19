import React, { useState } from 'react';
import './pagination.css';

export const Pagination = ({ totalDataCount, itemsPerPage, callbackFn }) => {
  const [currPage, setCurrPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [groupCount, setGroupCount] = useState(5);

  const pages = () => {
    const totalPages = Math.ceil(totalDataCount / itemsPerPage);
    let pageList = [];

    if (totalPages <= 5) {
      pageList.push(
        <li
          key={0}
          onClick={goPrev}
          className={currPage === 1 ? '_disable' : ''}
        >
          prev
        </li>
      );
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(
          <li
            key={i}
            className={currPage == i ? '_active' : ''}
            onClick={() => go(i)}
          >
            {i}
          </li>
        );
      }
      pageList.push(
        <li
          key={totalPages + 1}
          onClick={goNext}
          className={currPage === totalPages ? '_disable' : ''}
        >
          next
        </li>
      );
    } else {
      pageList.push(
        <li
          key={0}
          onClick={goPrev}
          className={currPage === 1 ? '_disable' : ''}
        >
          prev
        </li>
      );

      for (let i = startPage; i < groupCount + startPage; i++) {
        if (i < totalPages) {
          pageList.push(
            <li
              key={i}
              className={currPage == i ? '_active' : ''}
              onClick={() => go(i)}
            >
              {i}
            </li>
          );
        }
      }

      if (totalPages - startPage > groupCount) {
        pageList.push(
          <li key={-1} className='eclipese'>
            ...
          </li>
        );
      }

      pageList.push(
        <li
          key={totalPages}
          onClick={() => go(totalPages)}
          className={currPage === totalPages ? '_disable' : ''}
        >
          {totalPages}
        </li>
      );

      pageList.push(
        <li
          key={totalPages + 1}
          onClick={goNext}
          className={currPage === totalPages ? '_disable' : ''}
        >
          next
        </li>
      );
    }

    return pageList;
  };

  const go = (currPage) => {
    // 点击next后
    if (currPage % groupCount === 1) setStartPage(currPage);
    // 点击prev后
    if (currPage % groupCount === 0) {
      setStartPage(currPage - groupCount + 1);
    }

    setCurrPage(currPage);
    callbackFn(itemsPerPage, currPage);
  };

  const goNext = () => go(currPage + 1);
  const goPrev = () => go(currPage - 1);

  return (
    <div>
      <ul className='pagination-container'>{pages()}</ul>
    </div>
  );
};

export default Pagination;
