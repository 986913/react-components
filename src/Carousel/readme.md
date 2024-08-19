## 👨‍👧 组件关系

```
<CarouselWrapper>
    <Carousel/>
  <CarouselWrapper/>
```

## 🔢 各组件的 state, props

- ### `CarouselWrapper`

  - states: `data` - 数组, 用来 fetch API 得到数组结果, `useEffect`中得到结果后存为 state 并且作为`props`传给 Carousel 组件
  - props：无

- ### `Carousel`

  - props: `images` - 数组, 其中每一项是`object`
  - states：
    - `currIndex` - number, 表示当前 active 图片的 index

## 👀 知识点

思路就是先写组件最外层 container, 定死宽度

再去写一个 inner container 装所有图片，把图片们都拉到横轴， 然后定`transform: transaleX(-多少px)`和 `tra` 进行动画平移

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
  - 对于“Previous”按钮，使用了 `aria-label="Previous image"`
  - 对于“Next”按钮，使用了 `aria-label="Next image"`
- **`disabled` 属性**：禁用按钮（`Prev` 和 `Next`）在没有图片的情况时
