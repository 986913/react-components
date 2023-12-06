import React from 'react';
import './autoCompleteII.css';
import { useDebounce } from './useDebounce';
import { useState, useEffect } from 'react';
import { USA_STATES } from './constants';

export const AutoComplete = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredList = USA_STATES.filter((item) =>
        item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setList(filteredList);
    } else {
      setList([]);
    }
  }, [debouncedSearchTerm]);

  const handleOnchange = (e) => setSearchText(e.target.value);
  const handleOnClick = (name) => {
    alert(`
      choose result : ${name},
      🚀 works good. should redirect to ${name} page!
    `);
    setSearchText('');
    setList([]);
  };
  const handleOnKeyDown = (e, name) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      handleOnClick(name);
    }
  };

  return (
    <form className='autocomplete'>
      <input
        id='searchInput'
        type='text'
        placeholder='serach here..'
        onChange={handleOnchange}
        value={searchText}
      />

      {list && searchText && (
        <section className='section'>
          <ul>
            {list.map((item) => (
              <li
                key={Math.random()}
                tabIndex={0}
                onClick={() => handleOnClick(item)}
                onKeyDown={(e) => handleOnKeyDown(e, item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </form>
  );
};
