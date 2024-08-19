## 👨‍👧 组件关系

> 这个组件核心思想和 CarouseI 一样的，就是添加了处理 re-size 窗口时候的逻辑而已

```
<CarouselWrapperII>
    <Carousel/>
  <CarouselWrapperII/>
```

## 🔢 各组件的 state, props

- ### `CarouselWrapperII`

  - states & props：无

- ### `Carousel`

  - props: `images` - 数组, 其中每一项是`object`: {src: 'string', alt:'string'}
  - states：
    - `currIndex` - number, 必需。 表示当前 active 图片的 index
    - `imageWidth`-null | number, 非必需。 表示当前 viewPort 的宽度
    - `isTransitioning` - boolean, 非必需。 表示是否执行 css `transition`动画

## 👀 知识点

1. `dom.getBoundingClientRect()`的使用：

   1. 函数调用者是 dom element, 在 react 中就是使用`useRef`对 some jsx element's `ref`进行挂钩. 也就是这道题的`containerRef`
   2. 函数没有参数，输出一个`DOMRect`对象, 包括了元素的大小及其相对于视口的位置
   3. 其他实例参考[这个链接](https://juejin.cn/post/6844903888902963213)

2. 一个编程小技巧：Modulo Operation， 体现在：

   ```
   setCurrIndex((newIndex + images.length) % images.length);
   ```

   这个操作是用来确保`newIndex`在`images`数组的有效范围内循环：

   `newIndex + images.length`： 这个部分是为了确保`newIndex`不会变成负数。如果`newIndex`是负的，加上`images.length`之后，就会变成一个正数或零

   `% images.length`： 取模操作会把任何数字都限制在 `0`到`images.length - 1` 之间，这样就可以确保`newIndex`在数组的有效索引范围内循环。

   例子：假设 `images.length = 5`，以下是一些可能的 `newIndex` 情况：

   `newIndex = 2`，结果是 `(2 + 5) % 5 = 7 % 5 = 2`

   `newIndex = -1`，结果是 `(-1 + 5) % 5 = 4 % 5 = 4`

   `newIndex = 6`，结果是 `(6 + 5) % 5 = 11 % 5 = 1`

   这就意味着无论 `newIndex` 是多少，最终的索引总是会在 `0` 到 `images.length - 1` 之间循环，从而避免了数组越界的情况。

3. 这个题使用了`useEffect`给`window`添加了事件绑定：`window.addEventListener('resize', functionName)`，只要窗口大小变化了，就会重新 read image 的宽度， 进而更改`imageWidth`state, 进而动态控制向左平移的值: `style={{transform: translateX(-当前active index * imageWidth动态值px)}}`
4. react jsx element 上的属性： `onTransitionEnd` - Fires when the CSS transition (defined in the `transition` property) finishes.

## 💃🏻 CSS animations and transitions

### ` transform` VS `transition`: `

> 一句话总结： transform`是“怎么变”，而`transition` 是“怎么动画地变”

### 1.**CSS `transform`**：

- **作用**：`transform` 用于对元素进行变形，如旋转（rotate）、缩放（scale）、平移（translate）或倾斜（skew）。它只定义了元素如何变化，但不包含动画的过渡效果。
- **例子**：如果你使用 `transform: rotate(45deg);`，元素会立即旋转 45 度，没有任何过渡效果，变化是瞬间完成的。

### 2. CSS `transition`：

- **作用**：`transition` 用于设置元素属性在一段时间内平滑过渡的效果。它可以对元素的属性变化进行动画处理，包括 `transform` 的变化。
- **例子**：如果你想让元素在 2 秒内从 0 度旋转到 45 度，你可以这样结合 `transition` 和 `transform`：

  ```
  .element {
    transition: transform 2s;  // <--- transition会被添加到变化之前的CSS类中
    transform: rotate(0deg);
  }

  .element:hover {
    transform: rotate(45deg);
  }
  ```

  在这个例子中，当用户将鼠标悬停在元素上时，元素会在 2 秒内平滑地从 0 度旋转到 45 度。

  ### 区别总结：

  - **`transform`**：定义元素将发生什么样的变形（变化本身），比如旋转、缩放等。
  - **`transition`**：定义这个变形或任何其他属性的变化在多长时间内、以什么方式发生，从而实现动画效果。

## ♿ Accessibility (a11y)

- **`aria-label` 属性**：屏幕阅读器会读取这个标签内容，从而帮助盲人 🧑‍🦯 理解按钮或其他交互元素的功能
  - 对于“Previous image”按钮，使用了 `aria-label="Previous image"`
  - 对于“Next image”按钮，使用了 `aria-label="Next image"`
  - 对于每个页面指示器按钮，使用了 `aria-label={`Navigate to \${alt}`}`
- **`disabled` 属性**：
  - 禁用按钮（`Prev` 和 `Next`）在 `isTransitioning` 状态为 `true` 时，这有助于防止在过渡期间用户重复点击按钮
  - 禁用页面指示器按钮（`dot`）在 `isTransitioning` 状态为 `true` 时
