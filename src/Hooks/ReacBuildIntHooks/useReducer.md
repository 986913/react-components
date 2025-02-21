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

## **3. useReducer 适用场景**

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
