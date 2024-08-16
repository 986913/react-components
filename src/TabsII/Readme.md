## 👨‍👧 组件关系

> 这个组件和 Tabs 组件一样，就是多了 ARIA

```
<TabsIIWrapper>
  <Tabs/>
<TabsIIWrapper/>
```

## 🔢 各组件的 state, props

- ### `TabsIIWrapper`

  - states / props: 无 (这个 wrapper 无任何作用)

- ### `Tabs`

  - states：`activeId` - number, 代表当前哪个 tab 是 active 的
  - props: `items`- 每项是 object 的数组, 代表渲染 `Tabs`组件的初始数据数组

## 👀 知识点

1. 可以通过 html attribute `hidden`来控制元素的 visibility
2. react 中事件添加时候，
   1. 如果不给函数传值，那就直接写 function name：`onClick={handleClick}`
   2. 如果要给函数传值，那就要用 arrow func 包裹: `onClick={() => handleClick(你想传的值)}`
3. [😊](https://emojipedia.org/smiling-face-with-smiling-eyes)一个很实用的 helper function：
   1. 输出是 array, 输出是 string, 作用是过滤到所有 falsey 的值
   2. `const classNames = (...args) => args.filter(Boolean).join(' ')`

## ♿ Accessibility (a11y)

1. `role = 'tablist'` - The element that serves as the container for the set of tabs
2. `role = 'tab'` - Each element that servers as a tab, and is contained within the element with role `tablist`
3. `role = 'tabpanel'` - Each element that contains the content panel for a `tab` has role `tabpanel`
4. `aria-controls = '被控制元素的id'` - Each element with role `tab` has the property `aria-controls` referring to its associated `tabpanel` element
5. `aria-selected = true or false` - current tab element has been selected or not
6. `aria-labelledby = 控制我的元素id` - referring to its associated tab element.
7. use a `<button>` element to build the tabs as they need to be focusable and interactive.
