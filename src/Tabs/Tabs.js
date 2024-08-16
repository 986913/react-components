import React, { useState } from 'react';
import './tabs.css';

export const Tabs = ({ items }) => {
  const [activeId, setActiveId] = useState(1);
  const handleClick = (id) => setActiveId(id);

  return (
    <>
      <div>
        {items.map(({ id, label }) => (
          <button
            key={id}
            type='button'
            onClick={() => handleClick(id)}
            className={classNames('button', id === activeId && 'active')}
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {items.map(({ content, id }) => (
          <p key={id} hidden={id !== activeId}>
            {content}
          </p>
        ))}
      </div>
    </>
  );
};

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');
