import React from 'react';
import './autoComplete.css';
import { useDebounce } from './useDebounce';
import { useState, useEffect } from 'react';

export const AutoComplete = ({ api }) => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          setList(data);
          console.log('✅fetched new api');
        });
    } else {
      setList([]);
    }
  }, [debouncedSearchTerm, api]);

  const handleOnchange = (e) => setSearchText(e.target.value);
  const handleOnClick = (name) => {
    console.log('choose result:', name);
    console.log(`🚀 works good. should redirect to ${name} page!`);
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
        <section>
          <ul>
            {list.map((item) => (
              <li
                key={item.id}
                tabIndex={0}
                onClick={() => handleOnClick(item.name)}
                onKeyDown={(e) => handleOnKeyDown(e, item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </form>
  );
};
