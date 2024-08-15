## 👨‍👧 组件关系

> **这道题和`ProgressBarI`是很相似的**， 只不过`ProgressBarI`是单个 bar, 这道题是多个 bars 同时独立 run
>
> 全局设置了变量：DURATION

```
<ProgressBarIWrapper>
    <ProgressBar/>
  <ProgressBarIWrapper/>
```

## 🔢 各组件的 state, props

- ### `ProgressBarIWrapper`

  - states:
    - `progress` - number, 控制当前的 progress 值是多少， 范围在 0-100
    - `timerId` - object, 控制当前是不是 progressing 模式. 从而间接控制 button text 和对应事件
  - props: 无

- ### `ProgressBar`

  - states：无
  - props: `progress` - number 表示进度条的“进度”

## More CSS animations and transitions

下面是 css key points, 这道题有动态效果, 所以`scaleX`的值是通过`ProgressBar`组件的 props`progress`来控制的。

**不过这道题呢就不要写`.bar-filled`这种动画完成后的 css 了** 因为要用`setInterval`来模拟 css transition 的过程！

```
.progress {
  width: 500px;
  overflow: hidden;
}

.inner {
  {/* transform: scaleX(50%);  <--- this is dynamic value to control progress */}
  transform-origin: left;
}

```

## 👁️ 知识点

- 这道题入手点先是 figure out UI 长什么样， 参见上面 CSS
- 再思考组件关系，参见上面
- 对于父组件`ProgressBarIWrapper` , 要内部设置两个 state 来控制子组件`ProgressBar`的进度和当前模式, 参见上面

  - 注意点 1: 全局定义好 DURATION, 因为下面 setInterval 会用到
  - 注意点 2: setInterval 的使用, 用于计算每个 10 毫秒(自己可改时间间隔的)相对应该走的 progress steps
  - 注意点 3: `useState` 钩子返回一个状态值和一个用于更新该状态的函数，在 `useState` 返回的更新函数中传入一个函数，这种方法确保状态的更新是基于最新的状态值，从而避免了由于异步状态更新可能带来的问题:

    ```
     setProgress((prevProgress) => {return prevProgress + something })
    ```

## ♿ Accessibility (a11y)

- 进度条本身可以加`role = progressbar`
- 加`aria`属性， 比如`aria-valuemin`,`aria-valuemax`,`aria-valuenow`
