import React from 'react';

export const Cell = ({ selected, dateNumber, updateSelectedDateNumber})=> {
  const handleOnClick = () => updateSelectedDateNumber(dateNumber);
  return <div className={['item', selected && "selected"].filter(Boolean).join(' ')} onClick={handleOnClick}>{dateNumber}</div>
}