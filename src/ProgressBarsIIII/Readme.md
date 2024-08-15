## 👨‍👧 组件关系

> **这道题和`ProgressBarI`是很相似的**， 只不过`ProgressBarI`是单个 bar, 这道题是多个 bars 同时独立 run
>
> 全局设置了变量：
> CONCURENT_LIMIT
> DURATION

```
<ProgressBarsIIIIWrapper>
    <ProgressBar/>
  <ProgressBarsIIIIWrapper/>
```

## 🔢 各组件的 state, props

- ### `ProgressBarsIIIIWrapper`

  - states:
    - `progressBars` - 数字组成的 array, 表示所有进度条的状态
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
- 对于父组件`ProgressBarsIIIIWrapper` , 要内部设置两个 state 来控制子组件`ProgressBar`的进度和当前模式, 参见上面

  - 注意点 1: 全局定义好 `DURATION` `CONCURRENT_LIMIT`, 因为下面 `setInterval` 会用到
  - 注意点 2: `setInterval` 的使用, 用于计算每个 `10` 毫秒 (自己可改时间间隔的)相对应该走的 progress steps
  - 注意点 3: 这道题与`ProgressBarI`最大不同是此题 state 是所有进度条，所以要维持一个数组，而后者就只维持一个进度条，所以它的 state 就是 number 了
  - 注意点 4: 店家`start`按钮时，会有`CONCURRENT_LIMIT`个进度条开始或者继续 run, 所有`start`中要更新`progressBars` state, 也就是说要新的`newBars`, 这个`newBars`其中每一条进度条要正确显示进度， 所以一定要确保

    - 进度 100%的进步条不要继续加载了 -- `nonFullBars` (只过滤出没到 100%的进度条的`{value,index}`)
    - 确保 for loop 只 loop `nonFullBars`

      - 确保最多 run`CONCURRENT_LIMIT`个进度条 (`i< CONCURRENT_LIMIT`)

## ♿ Accessibility (a11y)

- 进度条本身可以加`role = progressbar`
- 加`aria`属性， 比如`aria-valuemin`,`aria-valuemax`,`aria-valuenow`
