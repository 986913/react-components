import React from 'react';

export const Cell = ({ index, disabled, mark, player, onClick }) => {
  return (
    <button
      aria-label={mark == null ? `Mark cell ${index} as ${player}` : undefined}
      className='cell'
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
};
