import React, { useState } from 'react';

export const TreeView = ({ treeData, defaultExpandedKeys }) => {
  // defaultExpandedKeys will be use later on;
  const [expandKeys, setExpandKeys] = useState([]);

  const handleOnClick = (item) => {
    const { key } = item;
    const isExpand = expandKeys.indexOf(key) !== -1;

    let newExpandKeys;
    if (isExpand) {
      newExpandKeys = expandKeys.filter((k) => k !== key);
    } else {
      newExpandKeys = [...expandKeys, item.key];
    }

    setExpandKeys(newExpandKeys);
  };

  const currsionRender = (data) => {
    return (
      <ul>
        {data.map((d) => {
          const isExpand = expandKeys.indexOf(d.key) !== -1;

          return (
            <li key={d.key} className='tree-item'>
              {d.children && (
                <span onClick={() => handleOnClick(d)}>
                  {isExpand ? '[-]' : '[+]'}
                </span>
              )}
              {d.title}

              {/* recurrsion is here */}
              {d.children && isExpand && currsionRender(d.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return <section>{currsionRender(treeData)}</section>;
};
