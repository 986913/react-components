import React from 'react';

export const Cell = ({ text, selected, updateSelectedDate})=> {
  const handleOnClick = () => {
    updateSelectedDate(text);
  }

  return <div className={['item', selected && "selected"].filter(Boolean).join(' ')} onClick={handleOnClick}>{text}</div>
}