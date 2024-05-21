import React from 'react';
import { Dropdown } from './Dropdown';

const configData = [
  { id: 1, content: 'item1' },
  { id: 2, content: 'item2' },
  { id: 3, content: 'item3' },
];

export const DropdownWrapper = () => {
  const cbFn = (data) => console.log(`you selected: ${data.content}`);

  return (
    <div>
      <Dropdown config={configData} callBackAfterSelect={cbFn} />
    </div>
  );
};
