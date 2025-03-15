import React from 'react';
import { VirtualizedListWindow } from './VirtualizedListWindow';

const Items = Array.from({ length: 1000 }, (_, idx) => `第${idx + 1}个元素`);

export const VirtualizedListWindowingWrapper = () => (
  <VirtualizedListWindow items={Items} windowHeight={500} itemHeight={100} />
);
