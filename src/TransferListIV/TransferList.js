import { useState } from 'react';
import { List } from './List';
import {
  generateItemsMap,
  determineListSelectionState,
  transferSelectedItems,
  DEFAULT_ITEMS_LEFT,
  DEFAULT_ITEMS_RIGHT,
} from './helper';
import './transferlistIV.css';

export const TransferList = () => {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT)
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT)
  );

  const handleLeftBtnClick = () =>
    transferSelectedItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft);
  const handleRightBtnClick = () =>
    transferSelectedItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight);

  return (
    <div className='transfer-list-IV'>
      <List items={itemsLeft} setItems={setItemsLeft} />

      <div className='transfer-list__actions'>
        <button
          aria-label='Transfer selected items to left list'
          disabled={determineListSelectionState(itemsRight) === 'none'}
          onClick={handleLeftBtnClick}
        >
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label='Transfer selected items to right list'
          disabled={determineListSelectionState(itemsLeft) === 'none'}
          onClick={handleRightBtnClick}
        >
          <span aria-hidden={true}>&gt;</span>
        </button>
      </div>

      <List items={itemsRight} setItems={setItemsRight} />
    </div>
  );
};
