useRef 可以更新状态的值，但不改变 UI(因为 useRef 返回的 ref 对象一直不变!)

## **1. useRef 的基本语法**

```
const ref = useRef(initialValue);
```

- `ref`：一个对象 `{ current: initialValue }`
- `useRef`：返回的 ref 对象在组件的整个生命周期内保持不变 (同一个 ref 对象)
- `initialValue`：初始值（可以是 `null`、对象或任何类型）

## **2. useRef 适用场景**

### **✅ 适用：**

- **获取 DOM 元素的引用**（如操作 `input`、`canvas` 等原生元素）
- **存储组件渲染间的可变值**（不会触发重新渲染）
- **保持组件的某些状态在渲染间隔中不变**（如存储 `setTimeout` 的 ID、前一次的状态值）

### **❌ 不适用：**

- **用来触发组件更新**（如果状态变化需要引起组件重新渲染，应该使用 `useState`）
- **存储大部分的应用状态**（`useRef` 主要用于持久化数据，而非驱动 UI 更新）

## **3. useRef 使用示范**

### **场景 1：访问 DOM 元素**

`useRef` 最常见的用途是获取 `DOM` 元素的引用，例如自动聚焦到 `input` 框：

```
import { useRef, useEffect } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // 组件加载时自动聚焦
  }, []);

  return <input ref={inputRef} placeholder="Auto focus input" />;
};

```

### **场景 2：存储可变值（不触发渲染）**

在 `useRef` 中存储的值不会触发组件重新渲染，因此它适用于存储类似 `setTimeout` 的 ID、前一个状态等。

```
import { useRef, useState } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

```

### **场景 3：获取前一次的 state 值**

有时，我们需要在 `useEffect` 里获取上一次的 `state` 值，而 `useRef` 可以帮助我们存储它。

```
import { useState, useEffect, useRef } from "react";

const PreviousStateExample = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(null);

  useEffect(() => {
    prevCountRef.current = count; // 在每次渲染后更新
  });

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

```
