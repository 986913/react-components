import React, { useRef, useId, useState, useEffect } from 'react';

export const BulkSelectionCheckbox = ({
  disabled,
  onChange,
  state,
  selectedCount,
  totalCount,
}) => {
  const ref = useRef();
  const bulkSelectionId = useId();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    switch (state) {
      case 'none':
        setChecked(false);
        ref.current.indeterminate = false;
        break;
      case 'partial':
        setChecked(false);
        ref.current.indeterminate = true;
        break;
      case 'all':
        setChecked(true);
        ref.current.indeterminate = false;
        break;
      default:
        return;
    }
  }, [state]);

  return (
    <div className='transfer-list__section__items__item'>
      <input
        ref={ref}
        disabled={disabled}
        type='checkbox'
        id={bulkSelectionId}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={bulkSelectionId}>
        {selectedCount} / {totalCount} Selected
      </label>
    </div>
  );
};
