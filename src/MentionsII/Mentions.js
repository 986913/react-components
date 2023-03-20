import React, { useState, useRef } from 'react';

export const Mentions = ({ children, defaultValue, onChange, onSelect }) => {
  const [inputText, setInputText] = useState(`@${defaultValue}` || '');
  const [mentionsVisible, setMentionsVisible] = useState(false);
  const [clientWidth, setClientWidth] = useState(100);
  const hiddenDiv = useRef(null);
  const [searchTxt, setSearchTxt] = useState('');

  const handleOnChange = (e) => {
    const val = e.target.value;
    if (val[val.length - 1] === '@') {
      setMentionsVisible(true);
      setClientWidth(100 + hiddenDiv.current.clientWidth);
    } else setMentionsVisible(false);

    setInputText(val);
    if (val.includes('@')) setSearchTxt(val.split('@').pop());
    onChange(inputText, searchTxt);
  };

  const handleOnClick = (e) => {
    const selectVal = e.target.innerText;
    setInputText(inputText + selectVal);
    setMentionsVisible(!mentionsVisible);
    onSelect(selectVal);
  };

  return (
    <div className='mentions-container'>
      <input type='text' value={inputText} onChange={handleOnChange} />
      <div className='hidden-div' ref={hiddenDiv}>
        {inputText}
      </div>

      {mentionsVisible && (
        <ul
          className='metion_list'
          onClick={handleOnClick}
          style={{ left: `${clientWidth}px` }}
        >
          {!children && <p>no data </p>}
          {children && children.map((child) => child)}
        </ul>
      )}
    </div>
  );
};
