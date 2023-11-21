import React, { useId } from 'react';

export const CheckboxItem = ({ onChange, label, checked }) => {
  // Let React generate a unique ID for each item so as to maximize
  // reusability of the component.
  const id = useId();

  return (
    <div className='transfer-list__section__items__item'>
      <input type='checkbox' id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
