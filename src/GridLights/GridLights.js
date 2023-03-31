import React, { useState } from 'react';
import './gridlights.css';

// Make it easy to visualize the board. Customize the board rendering just by changing this 2D array.
// Note that all rows have to contain the same number of elements in order for the grid to render properly.
const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');

const Cell = ({ filled, label, onClick, isDisabled }) => {
  // Use <button> so that can use the keyboard to move between cells with Tab and activate them with Enter/Space.
  return (
    <button
      aria-label={label}
      type='button'
      className={classNames('cell', filled && 'cell--activated')}
      onClick={onClick}
      // disabled prevents cells from responding to clicks.
      disabled={isDisabled}
    />
  );
};

export const GridLights = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleOnClick = (index) => {
    // Make a clone to avoid mutation of the orders array.
    const newOrder = [...order, index];
    setOrder(newOrder);

    // All the cells have been activated, we can proceedto deactivate them one by one.
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  const deactivateCells = () => {
    setIsDeactivating(true);

    const timer = setInterval(() => {
      // Use the callback version of setOrder to ensure we are reading the most updated order value.
      setOrder((prevOrder) => {
        // Make a clone to avoid mutation of the orders array.
        const newOrder = [...prevOrder];
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  return (
    <div className='wrapper'>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config
          .flat(1)
          .map((value, index) =>
            value ? (
              <Cell
                key={index}
                label={`Cell ${index}`}
                filled={order.includes(index)}
                isDisabled={order.includes(index) || isDeactivating}
                onClick={() => handleOnClick(index)}
              />
            ) : (
              <span key={index} />
            )
          )}
      </div>

      {/* Helper to show the state */}
      <pre>order array: {order.join(', ')}</pre>
    </div>
  );
};
