import React, { useTransition, useState } from 'react';

/* 你主动说："更新列表这个事不急！"

  setInput(value); // 紧急：立刻更新输入框
  startTransition(() => {
    setList(arr); // 不急：慢慢更新列表
  }); 
  
 */

export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  // 模拟耗时操作（生成 20000 个元素的数组）
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // 立即更新输入框

    // 把耗时操作包起来
    startTransition(() => {
      const arr = [];
      for (let i = 0; i < 20000; i++) {
        arr.push(value);
      }
      setList(arr); // 延迟更新列表
    });
  };

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={handleChange}
        placeholder='输入试试...'
      />

      {/* isPending 表示过渡状态 */}
      {isPending ? (
        <div>加载中...</div>
      ) : (
        <div>
          {list.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}
