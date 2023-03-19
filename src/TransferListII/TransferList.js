import React, { useState } from 'react';
import './transferlist.css';

export const TransferList = ({ dataSource, title, targetKeys, onChange }) => {
  // console.log(dataSource, targetKeys);

  const [availableItems, setLeftItems] = useState(dataSource);
  const [suggestion, setSuggestion] = useState(availableItems);
  const [targetItems, setTargetItems] = useState(
    dataSource.filter((el) => {
      return targetKeys.indexOf(el.key) !== -1;
    })
  );
  const [searchValue, setSearchValue] = useState('');

  const handleOnClick = (nextLeftItems, nextTargetItems, moveKey) => {
    onChange(nextLeftItems, nextTargetItems, moveKey); //callback

    setLeftItems(nextLeftItems);
    setSuggestion(nextLeftItems);
    setTargetItems(nextTargetItems);

    setSearchValue('');
  };
  const handleInputOnChange = (e) => {
    const value = e.target.value;
    const matchedItems = availableItems.filter((item) =>
      item.name.includes(value)
    );
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
        {availableItems.length > 0 ? (
          <ul>
            {suggestion.map((item) => (
              <li
                key={item.key}
                className={`${item.selected && 'disable'} transfer-item`}
              >
                <span>{item.name}</span>
                {!item.selected && (
                  <button
                    onClick={() =>
                      handleOnClick(
                        availableItems.map((obj) => {
                          if (obj.key === item.key) obj.selected = true;
                          return obj;
                        }),
                        [...targetItems, item],
                        item.key
                      )
                    }
                  >
                    + Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Empty</p>
        )}
      </div>
      <div className='transfer-column'>
        <div className='transfer-column-header'>
          <h3>{title[1]}</h3>
          <button
            onClick={() =>
              handleOnClick(
                availableItems.map((obj) => {
                  obj.selected = false;
                  return obj;
                }),
                []
              )
            }
          >
            Remove all
          </button>
        </div>
        {targetItems.length > 0 ? (
          <ul>
            {targetItems.map((item) => (
              <li key={item.key} className='transfer-item'>
                <span>{item.name}</span>
                <button
                  onClick={() =>
                    handleOnClick(
                      availableItems.map((obj) => {
                        if (obj.key === item.key) obj.selected = false;
                        return obj;
                      }),
                      targetItems.filter((obj) => obj.key !== item.key),
                      item.key
                    )
                  }
                >
                  Remove
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
