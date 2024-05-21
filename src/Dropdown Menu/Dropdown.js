import React from 'react';
import './dropdown.css';
import { useState, useRef, useEffect } from 'react';

export const Dropdown = ({ config, callBackAfterSelect }) => {
  const [showList, setShowList] = useState(false);

  const handleClick = () => setShowList(!showList);
  const handleSelectClick = (item) => callBackAfterSelect(item);

  const buttonRef = useRef();
  const menuRef = useRef();

  const clickOutsideListener = (e) => {
    if (menuRef.current && menuRef.current.contains(e.target)) {
      return;
    }
    setShowList(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideListener);
    return () => {
      document.removeEventListener('mousedown', clickOutsideListener);
    };
  }, []);

  return (
    <div className='dropdown-container'>
      <button
        ref={buttonRef}
        className='dropdown-btn'
        onClick={handleClick}
        aria-expanded={showList}
        aria-controls='menu'
        aria-label='help about dropdown button'
      >
        Select your option here
      </button>

      {showList && (
        <ul id='menu' ref={menuRef}>
          {config.map((item) => {
            const { content, id } = item;
            return (
              <li
                className='dropdown-list-item'
                key={Math.random()}
                onClick={() => handleSelectClick(item)}
              >
                {content}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
