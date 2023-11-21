import React, { useState } from 'react';
import { ItemList } from './ItemList';
import './transferlistIII.css';
import {
  generateItemsMap,
  hasNoSelectedItems,
  transferSelectedItems,
  transferAllItems,
  DEFAULT_ITEMS_LEFT,
  DEFAULT_ITEMS_RIGHT,
} from './helper';

export const TransferList = () => {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT)
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT)
  );

  const moveAllToLeft = () => {
    transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft);
  };
  const moveAllToRight = () => {
    transferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight);
  };
  const moveSelectedToLeft = () => {
    transferSelectedItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft);
  };
  const moveSelectedToRight = () => {
    transferSelectedItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight);
  };

  return (
    <div className='transfer-list'>
      <ItemList items={itemsLeft} setItems={setItemsLeft} />

      <div className='transfer-list__actions'>
        <button
          aria-label='Transfer all items to left list'
          disabled={itemsRight.size === 0}
          onClick={moveAllToLeft}
        >
          <span aria-hidden={true}>&lt;&lt;</span>
        </button>
        <button
          aria-label='Transfer selected items to left list'
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={moveSelectedToLeft}
        >
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label='Transfer selected items to right list'
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={moveSelectedToRight}
        >
          <span aria-hidden={true}>&gt;</span>
        </button>
        <button
          aria-label='Transfer all items to right list'
          disabled={itemsLeft.size === 0}
          onClick={moveAllToRight}
        >
          <span aria-hidden={true}>&gt;&gt;</span>
        </button>
      </div>

      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
};
