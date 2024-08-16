import React, { useState } from 'react';
import './tabs.css';

export const TabsII = ({ items }) => {
  const [activeId, setActiveId] = useState(1);
  const handleClick = (id) => setActiveId(id);

  return (
    <>
      {/* <--- diff */}
      <div role='tablist'>
        {items.map(({ id, label }) => (
          <button
            key={id}
            type='button'
            onClick={() => handleClick(id)}
            className={classNames('button', id === activeId && 'active')}
            role='tab' // <--- diff
            id={`tab-${id}`} // <--- diff
            aria-controls={`tabpanel-${id}`} // <--- diff
            aria-selected={id === activeId} // <--- diff
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {items.map(({ content, id }) => (
          <p
            key={id}
            hidden={id !== activeId}
            role='tabpanel' // <--- diff
            id={`tabpanel-${id}`} // <--- diff
            aria-labelledby={`tab-${id}`} // <--- diff
          >
            {content}
          </p>
        ))}
      </div>
    </>
  );
};

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');
