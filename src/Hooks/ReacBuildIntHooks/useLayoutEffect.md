### **总结**

- `useLayoutEffect`**在渲染后、绘制前运行**，适用于同步 DOM 操作，防止视觉闪烁。
- **Cleanup 函数** 在 effect 重新运行前和组件卸载时执行。
- **比 `useEffect` 更早执行**，但可能影响性能，**仅在需要阻止闪烁时使用**。

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

## 1. useLayoutEffect 的基本语法

```
useLayoutEffect(() => {
  // Effect 逻辑
  return () => {
    // Cleanup 逻辑
  };
}, [dependencies]);

```

- **Effect 逻辑**：可以用于测量 DOM、同步布局更新等任务。
- **Cleanup 逻辑**：可选的清理函数，通常用于移除事件监听或清除 DOM 操作的影响。
- **依赖数组**：
  - **不传依赖数组**：每次组件渲染后都会执行 effect。
  - **空依赖数组 `[]`**：effect 仅在组件挂载时运行一次。
  - **指定依赖 `[dep]`**：effect 仅在 `dep` 变化时运行。

## 2. useLayoutEffect 的 return Cleanup Function

- **在组件卸载时运行**：与 `useEffect` 相同，当组件被销毁时，`useLayoutEffect` 的 cleanup 函数会执行，以清理副作用。
- **在依赖项变化前运行**：当依赖项更新时，React **会先运行 cleanup 函数，再执行新的 effect**，确保旧的副作用被清理。

## **3. useLayoutEffect 是同步执行的**

- `useLayoutEffect`**在 DOM 变更后、浏览器绘制（paint）前同步运行**，这样可以**避免屏幕闪烁**。
- **与 `useEffect` 的区别**：

  - `useEffect`**在组件渲染完成后**（浏览器绘制完成后）执行
  - `useLayoutEffect`**在渲染后、绘制前** 立即运行，适用于**需要在屏幕更新前进行同步 DOM 操作**的场景。
  - 示例：比较 useEffect 和 useLayoutEffect:

    ```
    import { useEffect, useLayoutEffect, useState } from "react";

    const EffectComparison = () => {
      const [color, setColor] = useState("red");

      useEffect(() => {
        console.log("useEffect: DOM updated, after paint");
      });

      useLayoutEffect(() => {
        console.log("useLayoutEffect: Before paint, blocking render");
      });

      return (
        <div
          style={{ width: "100px", height: "100px", backgroundColor: color }}
          onClick={() => setColor(color === "red" ? "blue" : "red")}
        />
      );
    };

    export default EffectComparison;
    ```

    点击后，执行顺序：

    ```

    useLayoutEffect: Before paint, blocking render
    useEffect: DOM updated, after paint
    ```

    **`useLayoutEffect` 先执行**，阻止页面绘制，确保状态更新同步应用到 DOM，**不会有闪烁**。

    **`useEffect` 之后执行**，页面可能已经闪烁了（更新前短暂看到旧状态）

## **4. useLayoutEffect 适用场景**

✅ **适用：**

- **测量 DOM 位置、大小，并在绘制前更新 UI**（避免闪烁）
- **处理动画（同步执行更新）**
- **手动修改 DOM（如滚动、焦点管理等）**
- **处理同步副作用，确保 UI 状态稳定**

❌ **不适用：**

- **不应该用于异步操作，如 API 请求**（应使用 `useEffect`）
- **不适用于大部分普通副作用**（`useEffect` 更高效）
- **如果副作用不需要影响布局，则应使用 `useEffect`，避免阻塞渲染**
