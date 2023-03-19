import React, { useState } from 'react';
import './transferlist.css';

export const TransferList = ({ dataSource, title, targetKeys, onChange }) => {
  // console.log(dataSource, targetKeys);

  const [leftItems, setLeftItems] = useState(
    dataSource.filter((el) => {
      return targetKeys.indexOf(el.key) === -1;
    })
  );

  const [targetItems, setTargetItems] = useState(
    dataSource.filter((el) => {
      return targetKeys.indexOf(el.key) !== -1;
    })
  );

  const [searchValue, setSearchValue] = useState('');

  const [suggestion, setSuggestion] = useState(leftItems);

  const handleOnClick = (nextLeftItems, nextTargetItems, moveKey) => {
    onChange(nextLeftItems, nextTargetItems, moveKey); //callback
    setLeftItems(nextLeftItems);
    setSuggestion(nextLeftItems);
    setTargetItems(nextTargetItems);
    setSearchValue('');
  };

  const handleInputOnChange = (e) => {
    const value = e.target.value;
    const matchedItems = leftItems.filter((item) => item.name.includes(value));
    setSuggestion(matchedItems);
    setSearchValue(value);
  };

  return (
    <div className='transferBox'>
      <div className='transfer-column'>
        <h3>{title[0]}</h3>
        <input
          type='text'
          placeholder='search..'
          value={searchValue}
          onChange={handleInputOnChange}
        />
        {leftItems.length > 0 ? (
          <ul>
            {suggestion.map((item) => (
              <li key={item.key} className='transfer-item'>
                <span>{item.name}</span>
                <button
                  onClick={() =>
                    handleOnClick(
                      leftItems.filter((obj) => obj.key !== item.key),
                      [...targetItems, item],
                      item.key
                    )
                  }
                >
                  select
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Empty</p>
        )}
      </div>
      <div className='transfer-column'>
        <h3>{title[1]}</h3>
        {targetItems.length > 0 ? (
          <ul>
            {targetItems.map((item) => (
              <li key={item.key} className='transfer-item'>
                <span>{item.name}</span>
                <button
                  onClick={() =>
                    handleOnClick(
                      [...leftItems, item],
                      targetItems.filter((obj) => obj.key !== item.key),
                      item.key
                    )
                  }
                >
                  unselect
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
};
