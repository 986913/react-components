`useReducer` 是 React 提供的一个 Hook，适用于管理复杂 state 逻辑的情况。它可以看作是 `useState` 的替代方案，特别是在 state 依赖多个子值或涉及复杂的 state 逻辑（如多个 state 需要统一管理）时，`useReducer` 会比 `useState` 更合适。

## **1. useReducer 的基本语法**

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`：当前的 state 值。
- `dispatch`：触发 state 变化的方法（类似于 Redux 里的 `dispatch`）
- `reducer`：一个纯函数 `(state, action) => newState`，根据 action 更新 state
- `initialState`：state 的初始值

## **2. useReducer 适用场景**

### **✅ 适用：**

- 当 state 逻辑较复杂，涉及多个子状态时（例如表单数据、嵌套对象等）
- 当新的 state 依赖于之前的 state 时（避免 `useState` 回调形式 `setState(prevState => newState)`）
- 当需要在多个组件间共享相同的 state 逻辑时

### **❌ 不适用：**

- 只管理简单的 state，如 `useState(0)` 这种简单的数字、布尔值。
- 代码量较小且 `useState` 足够时，避免过度使用 `useReducer`

## **3. useReducer 使用示范**

如果 state 是一个对象，并且多个属性需要更新时，`useReducer` 比 `useState` 更方便：

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'changeName':
      return { ...state, name: action.payload };
    case 'changeAge':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

const Profile = () => {
  const [state, dispatch] = useReducer(reducer, { name: 'Alice', age: 25 });

  return (
    <div>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={() => dispatch({ type: 'changeName', payload: 'Bob' })}>
        Change Name
      </button>
      <button onClick={() => dispatch({ type: 'changeAge', payload: 30 })}>
        Change Age
      </button>
    </div>
  );
};
```

## 4. `useReducer`的第三个参数 : init 函数

`useReducer` 的第三个参数 `init` 用于懒初始化（lazy initialization），适用于通过 init 函数大开销的计算初始 `state` 的情况。它的作用是：**当 initialState 需要计算时，init 函数会在组件初始化时被调用，并返回初始的 state**，从而避免在每次渲染时重新计算初始 state。

#### 例子：计算斐波那契数列的前 N 项

假设我们有一个应用，需要在初始化时计算 **前 N 项斐波那契数列**，然后在 UI 里展示，同时允许用户手动重置或增加 `N` 的大小。因为计算斐波那契数列的前 N 项**可能很耗时**，所以我们用 `init` 确保这个计算**只在初始化时执行一次**。

```
import { useReducer } from "react";

// 1. 计算前 N 项斐波那契数列（耗时计算）
const generateFibonacci = (n) => {
  console.log("Computing Fibonacci sequence...");
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
};

// 2. reducer 函数
const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return { count: state.count + 1, sequence: generateFibonacci(state.count + 1) };
    case "reset":
      return { count: 10, sequence: generateFibonacci(10) };
    default:
      throw new Error("Unknown action type");
  }
};

// 3. init 函数：初始化 state（只在组件初始化时运行）
const init = (initialCount) => {
  return { count: initialCount, sequence: generateFibonacci(initialCount) };
};

const FibonacciGenerator = () => {
  // 4. 使用 useReducer，并传入 init 函数
  const [state, dispatch] = useReducer(reducer, 10, init);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Fibonacci Sequence: {state.sequence.join(", ")}</p>
      <button onClick={() => dispatch({ type: "increase" })}>Generate More</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

export default FibonacciGenerator;

```
