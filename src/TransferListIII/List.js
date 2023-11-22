import React from 'react';

export const List = ({ items, updateItems }) => {
  const handleOnChange = (lists, label, updateList) => {
    const newList = new Map(lists);
    newList.set(label, !newList.get(label));
    updateList(newList); // call父组件传过来的函数更新值
  };

  return (
    <ul className='items-container'>
      {/* items 像这样:     Map {"vue"=>false, "react"=>true}
          [...items]像这样: [['vue', false], ['react', true]] */}
      {[...items].map((item, index) => {
        const [text, checked] = item;
        return (
          <li key={`${text}-${index}`}>
            <div>
              <input
                // 注意：传进去的是items(不是单个item）,单个被checked的text 和更改父亲state的父亲勾子.
                onChange={() => handleOnChange(items, text, updateItems)}
                type='checkbox'
                checked={checked}
                id={`${text}-${index}`}
              />
              <label htmlFor={`${text}-${index}`}> {text}</label>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
