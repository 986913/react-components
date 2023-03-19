import React, { useState } from 'react';

/* actual TreeView Component, accept 2 props, manager 1 state: */
export const TreeView = ({ dataSource, onClickCallback }) => {
  const [expandKeys, setExpendKeys] = useState([]);

  const handleOnClick = (e, folder) => {
    onClickCallback(e, folder);
  };

  const iconControl = (data) => {
    const isExpand = expandKeys.indexOf(data.id) !== -1;
    if (data.type === 'folder') {
      if (isExpand) return <span> 📂 </span>;
      else return <span> 📁 </span>;
    } else {
      return <span> 🗒 </span>;
    }
  };

  const expandKeysContrl = (e, folder) => {
    e.stopPropagation();
    const isExpand = expandKeys.indexOf(folder.id) !== -1;

    let newExpandKeys;
    if (isExpand)
      newExpandKeys = expandKeys.filter((item) => item !== folder.id);
    else newExpandKeys = [...expandKeys, folder.id];

    setExpendKeys(newExpandKeys);
  };

  const recurrsionRender = (data) => {
    return (
      <ul>
        {data.map((d) => {
          const isExpand = expandKeys.indexOf(d.id) !== -1;

          return (
            <li
              key={d.id}
              onClick={(e) => {
                expandKeysContrl(e, d);
                handleOnClick(e, d);
              }}
            >
              {iconControl(d)}

              <span>{d.name}</span>

              {/*recurrsion here: */}
              {d.children && isExpand && recurrsionRender(d.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return recurrsionRender(dataSource);
};
