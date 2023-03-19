import React from 'react';
import { MultipleSelect } from './MultipleSelect';

const mockData = [
  { id: 1, content: 'China' },
  { id: 2, content: 'USA' },
  { id: 3, content: 'Japan' },
  { id: 4, content: 'Egipt' },
  { id: 5, content: 'Norway' },
  { id: 6, content: 'Mexico' },
];

export const MultipleSelectWrapper = () => {
  return (
    <div>
      <MultipleSelect dataSource={mockData} />
    </div>
  );
};
