## **1. `useContext` 的基本使用步骤**

### **📌 核心概念**

- `useContext` 允许组件访问 `React Context`，避免 `props drilling`（即层层传递 `props`）。
- `Context.Provider` 负责提供数据，`useContext` 让子组件可以直接消费数据。
- 默认值可在 `createContext(defaultValue)` 中提供，防止 `useContext` 在未包裹 `Provider` 时出错。

### 🚀 `useContext` 的标准用法

```
import { createContext, useContext, useState, useMemo } from "react";

// 1️⃣ 创建 Context（提供默认值，防止未包裹 Provider 时报错）
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

// 2️⃣ 创建 自定义Provider 组件，使用 `useMemo` 和 children 避免不必要的渲染
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const value = useMemo(() => ({ theme, setTheme }), [theme]); // 仅在 `theme` 变化时重新创建对象

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 3️⃣ 自定义 Hook，封装 `useContext`，简化调用
const useTheme = () => {
  return useContext(ThemeContext); // 直接返回 `{ theme, setTheme }`
};

// 4️⃣ 使用 Provider 包裹整个应用
const App = () => {
  return (
    <ThemeProvider>
      <ChildComponent />
    </ThemeProvider>
  );
};

// 5️⃣ 在子组件中使用 `useTheme`
const ChildComponent = () => {
  const { theme, setTheme } = useTheme(); // 通过解构获取 `theme` 和 `setTheme`

  return (
    <div>
      当前主题: {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        切换主题
      </button>
    </div>
  );
};

export default App;


```

## **2. `useContext` vs `useReducer` vs Redux：如何选择？**

### **✅ `useContext`**

- **适用于：\*\***被许多组件共享但很少改变的值\*\*（如主题 Theme、语言 Language、用户信息 UserInfo）。
- **为什么？**`useContext` 本质上是个订阅机制，`Context.Provider` 的 `value` 发生变化时，所有 `useContext` 的组件都会重新渲染，因此不适合高频更新的状态。

### **✅ `useReducer`**

- **适用于：\*\***需要复杂状态逻辑的局部状态\*\*（如表单状态、购物车）。
- **为什么？**`useReducer` 提供 `dispatch(action)`，让状态管理更加清晰且可预测。

### **✅ Redux**

- **适用于：\*\***大规模应用的全局状态管理\*\*（如身份认证、缓存、异步数据）。
- **为什么？** Redux 提供**持久化、DevTools 调试、中间件**，但成本更高。

| 场景               | `useContext`                   | `useReducer`                    | Redux                           |
| ------------------ | ------------------------------ | ------------------------------- | ------------------------------- |
| **适用情况**       | 共享但**不频繁变化**的全局状态 | 复杂逻辑的局部状态              | **全局复杂状态管理**            |
| **状态更新**       | 直接修改`Provider`传递的值     | `dispatch(action)`触发`reducer` | `dispatch(action)`触发`reducer` |
| **适用范围**       | 主题、语言、认证信息           | 购物车、表单、组件局部状态      | 用户身份、异步数据、跨页面状态  |
| **复杂度**         | 低                             | 中等                            | 高                              |
| **是否需要外部库** | 否                             | 否                              | 是                              |

### **💡 如何选择？**

1. **如果状态变化不频繁，且多个组件需要访问 → `useContext`**
   例如：`主题 (theme)`、`语言 (locale)`、`用户信息 (user)`。
2. **如果状态更新逻辑复杂，但仅在局部组件间共享 → `useReducer`**
   例如：`购物车 (cart)`、`复杂表单 (form state)`。
3. **如果是全局状态管理，数据量大、更新频繁 → Redux**
   例如：`用户身份 (auth)`, `异步数据 (API 状态)`。

## **3. 避免 `Context.Provider` 重新渲染子组件**

当 `Provider` 重新渲染时，它的 `value` 变了，会导致所有 `useContext` 订阅的组件**重新渲染**。为了解决这个问题，我们可以**使用 `useMemo`**：

### **✅ 正确写法（使用 `useMemo` 避免不必要渲染）**

```
const value = useMemo(() => ({ theme, setTheme }), [theme]);
<ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>;
```

- 这样 `value` 只会在 `theme` 变化时重新计算，而不是每次渲染都创建新对象。
- **避免 `useContext` 的所有订阅组件无意义地重新渲染**。

### **❌ 错误写法（直接传递对象，每次渲染都创建新引用）**

```
<ThemeContext.Provider value={{ theme, setTheme }}> {children} </ThemeContext.Provider>;

```

- 每次 `Provider` 重新渲染都会创建一个新的 `{ theme, setTheme }` 对象，导致所有 `useContext` 订阅的组件都被重新渲染，即使 `theme` 没变。

## **4. 为什么 `children` prop 避免重新渲染所有子组件？**

```
<ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>;

```

### **💡 为什么这样做可以避免不必要的渲染？**

1. **React 组件树是按层次结构更新的**
   - `Provider` 重新渲染时，所有使用 `useContext` 的组件都会重新渲染。
   - 但**没有消费 Context 的子组件不会受影响**。
2. **`children` 作为 `prop` 直接传递，不会因为 `Provider` 重新渲染而变化**
   - React **不会因为 `children` 发生变化而重新渲染子组件**，除非 `children` 内部的状态或 `props` 发生变化。
   - **只有使用了 `useContext` 的组件才会受影响**，其他子组件不会无意义地重新渲染。

### **✅ 最佳实践**

- **尽量避免直接传对象作为 `value`，用 `useMemo` 包装**。
- **子组件如果不需要 `useContext`，尽可能不要消费 `context`，以减少不必要的渲染**。

## **🎯 终极总结**

1. **`useContext` 适合不频繁更新的全局共享状态**（如主题、语言）。
2. **高频更新的复杂逻辑应使用 `useReducer`**，全局管理应使用 Redux。
3. **用 `useMemo` 避免 `Provider` 每次渲染都创建新 `value`，减少无意义的 `useContext` 触发渲染**。
4. **子组件如果不需要 `useContext`，直接用 `children` 传递，避免不必要的重渲染**。
