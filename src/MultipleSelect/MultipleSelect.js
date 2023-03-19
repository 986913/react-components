import { useState } from 'react';
import './multipleselect.css';

export const MultipleSelect = ({ dataSource }) => {
  const [displayList, setDisplayList] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [listItems, setListItems] = useState(dataSource);

  const handleOnFocus = () => setDisplayList(true);
  const handleOnBlur = () => {};

  const handleOnClick = (e) => {
    const id = e.target.id;
    const selected = dataSource.filter((data) => data.id == id);
    const newList = listItems.filter((data) => data.id != id);
    setSelectedItems([...selectedItems, ...selected]);
    setListItems(newList);
  };

  const handleOnDel = (id) => {
    const newSelectedItems = selectedItems.filter((item) => item.id !== id);
    const deleted = selectedItems.filter((item) => item.id === id);
    setSelectedItems(newSelectedItems);
    setListItems([...listItems, ...deleted]);
  };

  const handleClrAll = () => {
    setSelectedItems([]);
    setListItems(dataSource);
  };

  return (
    <section className='multiple-selection-container'>
      <ul
        tabIndex='0'
        className='selected-container'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        {selectedItems.map((item) => {
          return (
            <li
              className='selected-item'
              key={item.id}
              onClick={() => handleOnDel(item.id)}
            >
              <span>{item.content}</span>
              <span className='delete'>x</span>
            </li>
          );
        })}
        {selectedItems.length > 0 && (
          <button className='clear-all' onClick={handleClrAll}>
            clear all
          </button>
        )}
      </ul>

      {displayList && (
        <ul className='list-container'>
          {listItems.map((data) => {
            return (
              <li
                key={data.id}
                id={data.id}
                className='list-item'
                onClick={handleOnClick}
              >
                {data.content}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
