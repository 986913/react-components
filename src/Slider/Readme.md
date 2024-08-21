## 👨‍👧 组件关系

```
<ProgressBarWrapper>
    <ProgressBar/>
  <ProgressBarWrapper/>
```

## 🔢 各组件的 state, props

- ### `ProgressBarWrapper`

  - states: 无
  - props: 无

- ### `ProgressBar`

  - states：无
  - props: `value` - number 表示进度条的“进度”

## More CSS animations and transitions

进度条的“进度”在 CSS 中可以用`width`表示，但是一旦动起来的话，性能不好，所以要用`transform: scaleX(百分比值)`做，这样将来有动画就比较好操作，且记得搭配`transform-origin: left`来使用.

这道题没有动态效果，主要就是看 CSS 的写法, 下面是 css key points:

```
.progress {
  width: 500px;
  overflow: hidden;
}

.inner {
  transform: scaleX(50%); {/* <--- this is dynamic value to control progress */}
  transform-origin: left;
}

```

## ♿ Accessibility (a11y)

- 进度条本身可以加`role = progressbar`
- 加`aria`属性， 比如`aria-valuemin`,`aria-valuemax`,`aria-valuenow`s
