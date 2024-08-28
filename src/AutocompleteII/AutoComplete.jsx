import React from 'react';
import './autoCompleteII.css';
import { useDebounce } from './useDebounce';
import { useState, useEffect } from 'react';
import { USA_STATES } from './mockData';

export const AutoComplete = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(USA_STATES);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  useEffect(() => {
      console.log('用户停止type后,在这看更改list');
      const filteredList = USA_STATES.filter((item) =>
        item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setList(filteredList);
  }, [debouncedSearchTerm]);

  /* 这是不用useDebounce的时候：
    useEffect(() => {
      console.log('用户type时,在这看更改list goes crazy');
      const filteredList = USA_STATES.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()));
      setList(filteredList);
    }, [searchText]);
  */

  const handleOnchange = (e) => setSearchText(e.target.value);
  const handleOnClick = (name) => console.log('choose result:', name);

  return (
    <form className='autocomplete2'>
      <input
        id='searchInput2'
        type='text'
        placeholder='serach here..'
        onChange={handleOnchange}
        value={searchText}
      />

      {list && searchText && (
          <ul>
            {list.map((item) => (
              <li
                key={Math.random()}
                tabIndex={0}
                onClick={() => handleOnClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
      )}
    </form>
  );
};
