import React, { useDeferredValue, useState } from 'react';

export default function App() {
  const [text, setText] = useState('');

  // 使用 useDeferredValue 延迟 text 的更新
  const deferredText = useDeferredValue(text);

  // 模拟大数据量渲染（20000 个元素）
  const bigList = Array(20000)
    .fill('')
    .map((_, i) => <div key={i}>{deferredText}</div>);

  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='快速输入试试...'
      />

      {/* 正常渲染区域 */}
      <h3>即时显示: {text}</h3>

      {/* 延迟渲染区域 */}
      <div style={{ opacity: text !== deferredText ? 0.5 : 1 }}>
        <h3>延迟显示（{bigList.length} 条）:</h3>
        {bigList}
      </div>
    </div>
  );
}
