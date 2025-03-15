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

- **虚拟列表（Virtualized List - 这个组件使用 Windowing）**:

  - 通过计算 `scrollTop` 确定当前 viewport 内的可见数据索引范围 (`startIdx` \~ `endIdx`)，
  - 仅渲染 viewport 内的 DOM, 提高渲染性能。
  - **数据一次性加载完成，不涉及懒加载或动态请求。**

- **这个组建固定 Viewport 高度**:

  - 组件 `windowHeight` 固定，滚动时只替换可见区域的 DOM，保持 `div` 结构不变。

- **CSS 绝对定位优化渲染**:

  - 通过 `top: i * itemHeight` 确保列表项在正确的位置，避免 `margin` 或 `padding` 带来的额外渲染开销。

- **事件绑定优化**:

  - `onScroll` 事件使用 `useCallback` 进行优化，避免组件每次重新渲染时生成新的函数实例。

- 虚拟列表（Virtualized List Technique 总结）

  | 特性             | **Infinite Scrolling（无限滚动）**                             | **Windowing（虚拟列表）**                                    |
  | ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
  | **核心思想**     | 逐步加载新数据（Lazy-loading), 通常与后端分页 API 结合         | 仅渲染 viewPort 的列表项，滚动时动态替换 DOM                 |
  | **适用场景**     | **动态内容流（Feed）**，数据随时间不断增长（社交媒体、新闻流） | **超长静态列表**，但数据总量是固定的（联系人列表、文件列表） |
  | **数据加载方式** | **异步加载**，滚动到底部时从服务器请求新数据                   | **本地数据优化**，**所有**数据已获取，只优化渲染             |
  | **滚动条行为**   | 滚动条会随数据增多而变长                                       | 滚动条**保持恒定大小**，只加载可见内容                       |
  | **跳转体验**     | 直接跳转到某个位置（如回到顶部）会导致数据丢失或需要重新加载   | 可以**精准跳转**到任意位置（因为数据始终在本地）             |
  | **实现方式**     | IntersectionObserver 触发数据加载                              | **固定高度(Fixed Size)**计算可视区域                         |
  | **适合数据类型** | **动态增量数据**（新闻流、社交媒体 Feed、评论流）              | **静态大列表**（联系人列表、文件列表、表格数据）             |
