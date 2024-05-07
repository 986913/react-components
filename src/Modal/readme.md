## 👨‍👧 组件关系

```
<ModalWrapper>
    <Modal/>
  <ModalWrapper/>
```

## 🔢 各组件的 state, props

- ### `ModalWrapper`

  - states：`showModal` - 控制 `<Modal>`组件的显示和隐藏
  - props: 无

- ### `Modal`

  - states：无
  - props:
    - `children` - string: 接受用户自定义的 modal content text.
    - `isOpen` - boolean: 控制 `<Modal>`组件的显示和隐藏控制 Modal 组件的显示和隐藏
    - `onClose` - function: 用来关掉 `<Modal>`组件

## 👀 知识点

- `createPortal`的使用 ?

  ```
  createPortal（组件或者JSX element,  realDomNode ）
  ```

- `Fragment`组件的使用和好处
- `modal`组件中`overlay` 的 css 写法

## ♿ Accessibility (a11y)

#### Mouse interactions

- 确保点击 overlay 能关闭 modal, 但是点击 modal 本身不要关闭 modal
- 可以用`useRef`记录 modal dom, 然后在`useEffect` 中给 dom 监听`mousedown`事件，执行关闭 modal 的操作

#### Keyboard interactions

| Key         | Description                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tab         | Moves focus to the next tabbable element inside the modal. <br />If focus is on the last tabbable element inside the modal, moves focus to the first tabbable element inside the modal.     |
| Shift + Tab | Moves focus to the previous tabbable element inside the modal. <br />If focus is on the first tabbable element inside the modal, moves focus to the last tabbable element inside the modal. |
| Esc         | Closes the modal.                                                                                                                                                                           |

#### WAI-ARIA roles, states, and properties

- set attribute `role` as `dialog` for modal container
- set attribute `aria-modal` as `true` for modal container
- set attibute `aria-label` for modal container

## More CSS animations and transitions

## Internationalization (i18n)
