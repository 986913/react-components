## 👀 知识点

1. `Array.from({length: 5})`的使用，把数字 5 变成数组
2. **🚀 在 react 中如何自定义 css 属性**?
   🚀 通过`style={{}}`属性, 具体设置为：`style={{ '--自定义css属性' ：值 }}`
   🚀 在 css 中使用`var(--自定义css属性)`
3. css 中的`transition` VS `animation`, 具体看下

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

1. 🚀 在 react 中如何自定义 css 属性?
   🚀 通过`style={{}}`属性, 具体设置为：`style={{ '--自定义css属性' ：值 }}`
   🚀 在 css 中使用`var(--自定义css属性)`
2. 在 react 中如何定义`data-`属性？

   - 先在 react jsx 元素上绑定`data-任意名`,比如`data-status`
   - 后来给`data-任意名` 附上动态值，一般赋 state 值
   - 再后来在 css 中应用`data-任意名`，表示在“特定状态”下呈现出不同的 css

     ```
     .stateMachine {
       background-color: black;

       --myTransparency: 1;
       opacity: var(--myTransparency);
       transition: all 1s ease-in-out;
     }

     /* 🟡 css选择器，选react设置的data-任意名={动态state值} */
     .stateMachine[data-status='loading'] {
       --myTransparency: 0.3
     }
     ```

3. css 中的`transition` VS `animation`, 具体看下

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
