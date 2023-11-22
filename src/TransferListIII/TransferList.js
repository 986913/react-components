import React, { useState } from 'react';
import './transferlistIII.css';
import { List } from './List';
import {
  generateItemsMap,
  moveSelectedItems,
  moveAllItems,
  hasNoSelectedItems,
  DEFAULT_LEFT_ITEMS,
  DEFAULT_RIGHT_ITEMS,
} from './helper';

export const TransferList = () => {
  const [leftItems, setLeftItems] = useState(
    generateItemsMap(DEFAULT_LEFT_ITEMS)
  );
  const [rightItems, setRightItems] = useState(
    generateItemsMap(DEFAULT_RIGHT_ITEMS)
  );

  const moveAllToLeft = () => {
    moveAllItems(rightItems, leftItems, setRightItems, setLeftItems);
  };
  const moveAllToRight = () => {
    moveAllItems(leftItems, rightItems, setLeftItems, setRightItems);
  };
  const moveSelectedToLeft = () => {
    moveSelectedItems(rightItems, leftItems, setRightItems, setLeftItems);
  };
  const moveSelectedToRight = () => {
    moveSelectedItems(leftItems, rightItems, setLeftItems, setRightItems);
  };

  return (
    <div className='transfer-list'>
      <div className='left-box'>
        <List items={leftItems} updateItems={setLeftItems} />
      </div>

      <div className='mid-box'>
        <button onClick={moveAllToLeft} disabled={rightItems.size === 0}>
          <span> &lt;&lt;</span>
        </button>
        <button
          onClick={moveSelectedToLeft}
          disabled={hasNoSelectedItems(rightItems)}
        >
          <span>&lt;</span>
        </button>
        <button onClick={moveAllToRight} disabled={leftItems.size === 0}>
          <span> &gt;&gt;</span>
        </button>
        <button
          onClick={moveSelectedToRight}
          disabled={hasNoSelectedItems(leftItems)}
        >
          <span> &gt;</span>
        </button>
      </div>

      <div className='right-box'>
        <List items={rightItems} updateItems={setRightItems} />
      </div>
    </div>
  );
};
