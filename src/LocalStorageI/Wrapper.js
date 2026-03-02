import { useState, useEffect } from 'react';

export const LocalStorageWrapperI = () => {
  // 函数写法（lazy initial state）， 这个函数 只在组件第一次mount时执行一次
  const [val, setVal] = useState(() => {
    return localStorage.getItem('inputValue') || '';
  });
  useEffect(() => {
    localStorage.setItem('inputValue', val);
  }, [val]);

  const handleOnChange = (e) => setVal(e.target.value);

  return (
    <div>
      <input
        data-testid='input-id'
        type='text'
        value={val}
        onChange={handleOnChange}
      />
    </div>
  );
};
