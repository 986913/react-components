## 👨‍👧 组件关系

```
<DropdownWrapper>
    <Dropdown/>
  <DropdownWrapper/>
```

## 🔢 各组件的 state, props

- ### `DropdownWrapper`

  - states: 无
  - props: 无

- ### `Dropdown`

  - states：`showList`- boolean: 是否显示 items list
  - props:
    - `config` - object: 组件的初始值
    - `callBackAfterSelect` - function: 选择一个选项后的后续操作

## 👀 知识点

- `useRef`的使用
  - `const testRef = useRef()`, 创造出来的`testRef`会和 JSX 中的`ref`属性挂钩。
  - 创造出来的`testRef`经常使用`testRef.current`
  - `testRef.current.contains`API 的使用
- `useEffect`的 return 是清理函数

## ♿ Accessibility (a11y)

- `aria-controls`和`id`是配合使用的：
  - `<button aria-controls = 'allMingDevices'/>` 是控制这个表单的 `<ul id='allMingDevices'>`
- `aria-expanded`值是`boolean`, 经常用于主动控制一方表示当前控制的状态，比如上面的`<button/>`
