import './checkbox.css';
import { usaLoactions } from './dataConfig';
import { traversalAndUpdate } from './helper';
import { useState, useEffect } from 'react';

/******************************** Parent Component *************************************/
export const NestedCheckbox = ({ dataConfig }) => {
  const [initData, setInitData] = useState(dataConfig);
  useEffect(() => {
    setInitData(dataConfig);
  }, [dataConfig]);

  return <form>{renderData(initData, setInitData)}</form>;
};

/******************************** Child Component *************************************/
const renderData = (curData, changeCurData) => {
  // base condition
  if (!curData || !curData.label) return null;

  const { label, value, isChecked, indeterminate, children } = curData;

  const handleOnchange = (e) => {
    const { value: selectedVal, checked: checkedStatus } = e.target;
    const updatedData = traversalAndUpdate(
      { ...usaLoactions }, // <-- 使用full set data
      selectedVal,
      checkedStatus
    );
    changeCurData(updatedData);
  };

  return (
    <div className='checkbox-list' key={value}>
      <input
        type='checkbox'
        value={value}
        id={`${label}Input`}
        checked={isChecked}
        onChange={handleOnchange}
        ref={(el) => el && (el.indeterminate = indeterminate)}
      />
      <label htmlFor={`${label}Input`}>{label}</label>

      {/* recursion render child 1 by 1 */}
      {children &&
        children.length > 0 &&
        children.map((child) => renderData(child, changeCurData))}
    </div>
  );
};
