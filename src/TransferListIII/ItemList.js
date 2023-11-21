import React from 'react';
import { CheckboxItem } from './CheckboxItem';

export const ItemList = ({ items, setItems }) => {
  return (
    <div className='transfer-list__section'>
      <ul className='transfer-list__section__items'>
        {Array.from(items.entries()).map(([label, checked]) => (
          <li key={label}>
            <CheckboxItem
              label={label}
              checked={checked}
              onChange={() => {
                const newItems = new Map(items);
                newItems.set(label, !items.get(label));
                setItems(newItems);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
