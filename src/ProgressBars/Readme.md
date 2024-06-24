## 👨‍👧 组件关系

```
<ProgressBarsWrapper>
    <ProgressBars>
        <ProgressBar/>
    <ProgressBars/>
 <ProgressBarsWrapper/>
```

## 🔢 各组件的 state, props

- ### `ProgressBarWrapper`

  - states: 无
  - props: 无

- ### `ProgressBars`

  - states: `barCounts` - number, 表示当前总共有多少个 bars
  - props: 无

- ### `ProgressBar`

  - states: `startTransition` - boolean, 表示当前 bar 有没有开始动画
  - props: `duration` - number,单位是毫秒 ms 表示动画用多久时间

## More CSS animations and transitions

进度条的“进度”在 CSS 中可以用`width`表示，但是一旦动起来的话，性能不好，所以要用`transform: scaleX(0-1区间或百分比)`做，这样有动画就比较好操作，且记得搭配`transform-origin: left` 来使用.

这道题有动态效果，主要就是看 CSS 的写法, 下面是 css key points:

```

.progress-outter {
  width: 500px;
  overflow: hidden;
}

.progress-inner {
  transform: scaleX(0); {/* <--- this is dynamic value to control progress */}
  transform-origin: left;
  transition-property: transform;
  {/* transition-duration: 400  这个在react中被动态控制 */}
  transition-timing-function: linear;
}

{/* 这个在react中被动态控制 需要被动态的添加才会启动动画 */}
.bar-filled {
  transform: scaleX(1);
}
```

## 👀 知识点

- `Array.from({ length: count })`的使用
  - 当你的 state 只是一个 integer number 的时候，你想通过它来创建数组，比如`test=3`,你想创造出`[0,1,2]`, 那么你就可以使用`Array.from({ length: test }).map((_,idx) => idx)`
- 有多少 bars 是用户决定的，所以要把 bars 的数量设为 state!
- 切记, 当有多个 bars 的时候，**一定要确保 key 是对的上的**，因为这题要点击 button 后 bars 之间相互独立跑，而不是一块重新跑, 如果你用了 `Math.random()` 作为 `key`，每次渲染都会生成一个新的 `key`，导致所有的 `ProgressBar` 组件重新渲染并重新运行动画。。。
-

## ♿ Accessibility (a11y)

- 进度条本身可以加`role = progressbar`
- 加`aria`属性， 比如`aria-valuemin`,`aria-valuemax`,`aria-valuenow`
