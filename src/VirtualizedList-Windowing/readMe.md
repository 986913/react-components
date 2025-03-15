## 👨‍👧 组件关系

```
<VirtualizedListWindowingWrapper>
    <VirtualizedListWindow/>
  <VirtualizedListWindowingWrapper/>
```

## 🔢 各组件的 state, props

- ### `VirtualizedListWindowingWrapper`

  - states / props: 无 (这个 wrapper 无任何作用)

- ### `VirtualizedListWindow`

  - **props**:
    - `items` - `Array<any>`: 需要渲染的完整数据列表，数据一次性全部加载完成
    - `windowHeight` - `number`: 视口（viewport）的固定高度
    - `itemHeight` - `number`: 每个列表项的固定高度
  - **states**:
    - `scrollTop` - `number`: 记录滚动条当前位置，用于计算可见区域的数据索引

## 👀 知识点

- **虚拟列表（Virtualized List）**:
  - 通过计算 `scrollTop` 确定当前 viewport 内的可见数据索引范围 (`startIdx` \~ `endIdx`)，
  - 仅渲染 viewport 内的 DOM, 提高渲染性能。
  - **数据一次性加载完成，不涉及懒加载或动态请求。**
- **固定 Viewport 高度**:
  - 组件 `windowHeight` 固定，滚动时只替换可见区域的 DOM，保持 `div` 结构不变。
- **CSS 绝对定位优化渲染**:
  - 通过 `top: i * itemHeight` 确保列表项在正确的位置，避免 `margin` 或 `padding` 带来的额外渲染开销。
- **事件绑定优化**:
  - `onScroll` 事件使用 `useCallback` 进行优化，避免组件每次重新渲染时生成新的函数实例。
