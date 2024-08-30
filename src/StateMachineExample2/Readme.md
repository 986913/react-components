# 💭 思路

🚀 **在 react 中如何使用 state machine 这个概念？**

> 一句话总结：
> 外部定义 State Machine, 然后 JSX 利用 data-自定义属性和事件绑定 去控制 CSS

- 先在外部定义一个 plain object: `STATE_MACHINE`， 其中定义了状态初始值和其 states, 以及每个 state 对应的下一个 state

  ```
  const STATE_MACHINE = {
    init: 'init',
    states:{
      pending: { on: { CLICK:'error' } },
      error:   { on: { CLICK:'success' } },
      success: { on: { CLICK:'init' } },
      init:    { on: {CLICK: 'pending'}}
    }
  }
  ```

- 把`STATE_MACHINE`的初始值`init`设置为组件的 local state: `curMode`, 用于初始化当前模式
- 把 react jsx 元素上的`data-任意名`和动态 state 值绑定: `data-theme={curMode}`
- 然后给 button 绑定`onClick`事件，用于控制更新 state`curMode`, 其中有用到`useRef`和`.dataset` API 的使用，参考下面知识点版块
- 后来在 css 中应用`data-任意名`，表示在“特定状态”下呈现出不同的 css

  ```

  <div className='stateMachineII' 🟡data-theme={curMode} ref={stateMachineRef}  >


  .stateMachineII {
    --themeColor: gray;
  }
  .stateMachineII[data-theme='pending'] {
    --themeColor: yellow;
  }
  .stateMachineII[data-theme='error'] {
    --themeColor: red;
  }
  .stateMachineII[data-theme='success'] {
    --themeColor: green;
  }


  .stateMachineII input {
    border-color: var(--themeColor);
  }
  .stateMachineII button {
    margin-left: 1.5em;

    border-color: var(--themeColor);
    background-color: var(--themeColor);
  }
  ```

## 👀 知识点

当我在 React 中想获取某个 DOM 元素的`.dataset`数据时，你不能直接拿，
你得先拿到 DOM 元素的 ref 引用，这就是为啥要用到`useRef`, 所以有 2 个知识点：

```
<div className='stateMachineII' data-theme={curMode} ref={stateMachineRef}  />
```

1. `useRef`的使用:
   1. `const testRef = useRef()`, 创造出来的`testRef`会和 JSX 中的`ref`属性挂钩。
   2. 创造出来的`testRef`经常使用`testRef.current`
2. 如何获取 DOM 元素的自定义 data 属性? ---> `.dataset.自定义属性`
   ```
    const curTheme = stateMachineRef?.current?.dataset.theme;
   ```

## 💃 CSS

`transition` VS `animation`:

| transition                                                                                          | animation                                                   |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Creates smooth transitions from one CSS value to another                                            | Animates the style change from one CSS keyframe to another. |
| Need triggers,_eg_`:hover`  `:inactive`                                                             | NOT need triggers                                           |
| Only 2 states: an initial and a final state.<br /><br /><br />You cannot create intermediate steps. | Animation allows you to create multiple states              |
| Runs only once                                                                                      | You can run multiple animation iterations—even to infinity  |
| Best used for basic style changes                                                                   | Best used for dynamic style changes                         |

`transition`简写语法：(确保 duration 在 delay 之前就行, 其他顺序不重要)

```
transition: { transition-property  transition-duration transition-timing-function transition-delay }
```

举例：The snippet used commas (`,`) to separate each of the transitional properties

```
img {
  width: 40%;
  opacity: 0.4;
  transition: width 3s linear, opacity 4s ease-out, transform 5s;
}

img:hover {
  width: 100%;
  opacity: 1;
  transform: rotate(45deg);
}
```

`animation`简写语法：(确保 duration 在 delay 之前就行, 其他顺序不重要)

```
animation: animation-name animation-duration animation-delay animation-timing-function animation-iteration-count animation-direction animation-fill-mode animation-play-state ;
```

举例：

```
div {
  animation: change-width 5s 2s ease-in-out 3 alternate both running;
}
```

上述等同于

```
div {
  animation-name: change-width;
  animation-duration: 5s;
  animation-delay: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 3;
  animation-direction: alternate;
  animation-play-state: running;
  animation-fill-mode: both;
}
```

同时运用多个动画的例子：The snippet below applied 3 `@keyframes` rulesets to the `div` element using commas (`,`) to separate each `@keyframes`' configurations.

```
div {
  width: 70px;
  height: 70px;
  background-color: green;
  animation:
    5s ease-in-out 3s 3 alternate both change-width,
    5s 3s infinite alternate both change-shape,
    5s 3s infinite rotate-hue;
}

@keyframes change-width {
  from {width: 70px; background-color: purple;}
  to {width: 100%; background-color: orange;}
}
@keyframes change-shape {
  from {border-radius: 0%; border: 1px solid blue;}
  to {border-radius: 50%; border: 7px solid green;}
}
@keyframes rotate-hue {
  from {filter: hue-rotate(0deg);}
  to {filter: hue-rotate(360deg);}
}
```
