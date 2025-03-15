## 👨‍👧 组件关系

```
<InfiniteScrollWrapper>
    <InfiniteScroll/>
  <InfiniteScrollWrapper/>
```

## 🔢 各组件的 state, props

- ### `InfiniteScrollWrapper`

  - states: `dataList` - arrary, pass as `children`to `<InfiniteScroll/>`
  - props: 无

- ### `InfiniteScroll`

  - states：`curPage`- number. 当前 page number; `setCurPage` - function.调整当前`curPage`
  - props:
    - `children` - array, 组件的初始值,来源于`<InfiniteScrollWrapper/>`的 state`dataList`.用来 render 第 1 批数据, `<InfiniteScroll/>`内部负责`children`的 UI
    - `loadMore` - function, callback function that be used to modify `<InfiniteScrollWrapper/>`'s state`dataList`

## 👀 知识点

- `useRef`的使用

  - `const testRef = useRef()`, 创造出来的`testRef`会和 JSX 中的`ref`属性挂钩。
  - 创造出来的`testRef`经常使用`testRef.current`

- 在`useEffect`中 setup`IntersectionObserver`:

  - 目的：创建`IntersectionObserver`实例，用来监听目标 ref 元素`bottomObserverRef`
  - `const observer = new IntersectionObserver(cb, option)`用法：

    - 第 1 个参数是 callback function: `cb`, This means the `cb` will be triggered under the following case:

      - When an Observed Element `bottomObserverRef` Enters the Viewport
      - When an Observed Element `bottomObserverRef` Exist the Viewport
      - When the intersection ratio change, at this case, because `threshold : 1` , so once `bottomObserverRef` total visible inside viewport, then `observerCallback`will be called
      - On Initial Observation
      - 本例子中的`cb`就是`observerCallback`, it is used to check if the bottom element `bottomObserverRef` is intersecting with the viewport. If it is, it increments the `curPage`state and calls`loadMore` with the new page number.

    - 第 2 个参数是 option

      - 常见 option 为`{threshold: 1}`

    - 创建出来的实例`observer`有 2 个常见方法, in this case, 被监督的元素是`bottomObserverRef.current`

      - `.observe (被监督的元素)`
      - `.unobserve(被监督的元素)`

  - 注意`useEffect`的 dependicien 用的是 **memoized** `observerCallback` (IE: `memoizedObserverCallback`), which ensures that the `observer`is not unnecessarily recreated unless the`loadMore` function changes.

- 使用 `useCallback`to memoizes `observerCallback` function, 且`useCallback`dependience is `loadMore`function

  - `useCallback`使用方式： `useCallback(fn, dependencies)`

## ♿ Accessibility (a11y)
