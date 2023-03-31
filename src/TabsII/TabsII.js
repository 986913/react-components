import React, { useState } from 'react';
import './tabs.css';

const getTabId = (id) => `tab-${id}`;
const getPanelId = (id) => `tabpanel-${id}`;
// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => {
  return args.filter(Boolean).join(' ');
};

export const TabsII = ({ items }) => {
  const [activeId, setActiveId] = useState(1);
  const handleClick = (id) => setActiveId(id);

  return (
    <div>
      {/* <--- diff */}
      <div role='tablist'>
        {items.map(({ id, label }) => {
          const tabId = getTabId(id);
          const panelId = getPanelId(id);
          const isActiveId = id === activeId;

          return (
            <button
              key={id}
              type='button'
              id={tabId} // <--- diff
              role='tab' // <--- diff
              aria-controls={panelId} // <--- diff
              aria-selected={isActiveId} // <--- diff
              onClick={() => handleClick(id)}
              className={classNames('button', isActiveId && 'active')}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div>
        {items.map(({ content, id }) => {
          const tabId = getTabId(id);
          const panelId = getPanelId(id);
          const isActiveId = id === activeId;

          return (
            <p
              id={panelId} // <--- diff
              aria-labelledby={tabId} // <--- diff
              role='tabpanel' // <--- diff
              key={id}
              hidden={!isActiveId}
            >
              {content}
            </p>
          );
        })}
      </div>
    </div>
  );
};
