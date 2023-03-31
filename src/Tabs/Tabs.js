import React, { useState } from 'react';
import './tabs.css';

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => {
  return args.filter(Boolean).join(' ');
};

export const Tabs = ({ items }) => {
  const [activeId, setActiveId] = useState(1);
  const handleClick = (id) => setActiveId(id);

  return (
    <div>
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
    </div>
  );
};
