import React from 'react';

export const Cell = ({ index, disabled, mark, player, onClick }) => {
  return (
    <button
      aria-label={mark == null ? `Mark cell ${index} as ${player}` : undefined}
      className='cell'
      disabled={disabled}
      onClick={onClick}
    >
      {/* mark是重要的prop,用来显示X，O或者空值的 */}
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
};
