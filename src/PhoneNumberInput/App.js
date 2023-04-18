import React, { useState } from 'react';

const App = () => {
  let [displayVal, setDisplayVal] = useState('');

  let handleOnchange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 其中 \D 表示非数字字符，g 表示全局匹配。所以这个正则表达式会匹配目标字符串中的所有非数字字符。

    /*这个顺序是 先10， 后6 最后3.。。。。。。。。反着来还不行*/
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 6) value = `${value.slice(0, 6)}-${value.slice(6)}`;
    if (value.length > 3) value = `(${value.slice(0, 3)})${value.slice(3)}`;

    setDisplayVal(value);
  };

  return (
    <input
      data-testid='phone-number-input'
      onChange={handleOnchange}
      value={displayVal}
    />
  );
};

export default App;
