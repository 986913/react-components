### **总结**

- `useEffect`**默认在每次渲染后执行**，但可以通过依赖数组控制执行频率。
- **Cleanup 函数** 会在 effect **重新运行前** 和 **组件卸载**时执行。
- **`useEffect` 里的回调是同步的**，所以在其内部使用 `async` 函数来处理异步逻辑。

> ## ❗❗❗ React Hook 执行顺序 (挂载 & Re-render) ❗❗❗
>
> ### 🔹 **挂载时执行顺序** （优先级从高到低）
>
> 1. **Render 主线程**
> 2. `useInsertionEffect`
> 3. `useLayoutEffect`
> 4. `useEffect`
>
> ---
>
> ### 🔹 **Re-render 时执行顺序** （优先级从高到低）
>
> 1. **Render 主线程**
> 2. `useInsertionEffect` cleanup → then **立即执行 `useInsertionEffect`**
> 3. `useLayoutEffect` cleanup → then 立即执行 `useInsertionEffect`
> 4. **所有 ALL`useEffect` cleanup**（按顺序执行）
> 5. **所有 ALL`useEffect`** executed by order（按顺序执行）

## 1. useEffect 的基本语法

```
useEffect(() => {
  // Effect 逻辑
  return () => {
    // Cleanup 逻辑
  };
}, [dependencies]);

```

- **Effect 逻辑**：可以是数据获取、订阅、DOM 操作等副作用代码。
- **Cleanup 逻辑**：可选的清理函数，通常用于清理订阅、取消请求等。
- **依赖数组**：
  - **不传依赖数组**：每次组件渲染后都会执行 effect。
  - **空依赖数组 `[]`**：effect 仅在组件挂载时运行一次。
  - **指定依赖 `[dep]`**：effect 仅在 `dep` 变化时运行。

## 2. useEffect 的 return Cleanup Function

- **在组件卸载时运行**：当组件被销毁时，`useEffect` 的 cleanup 函数会执行，以清理副作用。
- **在依赖项变化前运行**：当依赖项更新时，React **会先运行 cleanup 函数，再执行新的 effect**，以避免旧的副作用影响新的逻辑。

## **3. useEffect 是同步执行的**

- `useEffect` 的回调函数是**同步执行的**，因为需要避免竞态条件（race conditions），确保 `state` 是最新的。
- **但 `useEffect` 内部的异步操作不会阻塞 UI 渲染**，因此常见做法是：

  - 在 `useEffect` 内部使用 `async` 函数
  - 或者在 `useEffect` 里调用一个返回 `Promise` 的函数
  - 示例：获取 API 数据

    ```
    import { useState, useEffect } from "react";

    const DataFetcher = () => {
      const [data, setData] = useState(null);
      //useEffect的callback参数 不要加🙅async !
      useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const result = await response.json();
            if (isMounted) {
              setData(result);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();

        return () => {
          isMounted = false; // Cleanup，避免异步数据更新卸载组件
        };
      }, []);

      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    };

    export default DataFetcher;

    ```
