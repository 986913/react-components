import React, { useState, useCallback } from 'react';
import './index.css';

// windowHeight就是viewPort的高度,
// itemHeight就是每项的高度

export const VirtualizedListWindow = ({ items, windowHeight, itemHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e) => {
    const currentScrollTop = e.target.scrollTop;
    setScrollTop(currentScrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const itemCountInViewPort = Math.ceil(windowHeight / itemHeight);

  const startIdx = Math.floor(scrollTop / itemHeight); // first visible item's index
  const endIdx = Math.min(startIdx + itemCountInViewPort, items.length); // last visible item's index

  const displayItems = () => {
    const visibleItems = [];

    for (let i = startIdx; i <= endIdx; i++) {
      const item = items[i];
      visibleItems.push(
        <div
          key={i}
          style={{ height: `${itemHeight}px`, top: `${i * itemHeight}px` }}
          className='single-item'
        >
          {item}
        </div>
      );
    }

    return visibleItems;
  };

  return (
    <div
      style={{ height: `${windowHeight}px` }}
      onScroll={handleScroll}
      className='virtualizedList-window'
    >
      <div style={{ height: `${totalHeight}px` }}>{displayItems()}</div>
    </div>
  );
};
