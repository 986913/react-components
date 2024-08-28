import React from 'react';
import './autoComplete.css';


export const AutoComplete = ({  searchText, setSearchText, list }) => {
  const suggestionList = list.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleOnchange = (e) => setSearchText(e.target.value);
  const handleOnClick = (name) => console.log('choose result:', name);

  return (
    <form className='autocomplete'>
      <input
        id='searchInput'
        type='text'
        placeholder='serach here..'
        onChange={handleOnchange}
        value={searchText}
      />

      {suggestionList && searchText && (
        <section className='section'>
          <ul>
            {suggestionList.map((item) => (
              <li
                key={item.id}
                tabIndex={0}
                onClick={() => handleOnClick(item.name)}
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
