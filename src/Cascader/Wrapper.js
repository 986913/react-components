import React from 'react';
import { Cascader } from './Cascader';

const mockData = [
  {
    name: 'Colors',
    id: 1,
    children: [
      { name: 'red', id: 4 },
      { name: 'blue', id: 5 },
    ],
  },
  {
    name: 'Sports',
    id: 2,
    children: [
      { name: 'skateboard', id: 6 },
      { name: 'running', id: 7 },
    ],
  },
  {
    name: 'Countries',
    id: 3,
    children: [
      { name: 'China', id: 8 },
      { name: 'USA', id: 9 },
    ],
  },
];

export const CascaderWrapper = () => {
  return <Cascader dataSource={mockData} />;
};
