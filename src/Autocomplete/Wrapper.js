import React from 'react';
import { AutoComplete } from './AutoComplete';
import { useDebounce } from './useDebounce';
import { useState, useEffect } from 'react';

export const AutocompleteWrapper = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  const debouncedSearchValue = useDebounce(searchText, 500);
  useEffect(() => {
    console.log('用户停止type后,在这看fetch api');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [debouncedSearchValue]);

  /* 这是不用useDebounce的时候：
    useEffect(() => {
      console.log('用户type时，在这看fetch api goes crazy');
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((res) => setDta(res));
    }, [searchText]);
  */

  return (
    <AutoComplete
      searchText={searchText}
      setSearchText={setSearchText}
      list={data}
    />
  );
};
