## 👨‍👧 组件关系

```
<StarRatingWrapper>
    <StarRating>
        <Star/>
    <StarRating/>
 <StarRatingWrapper/>
```

## 🔢 各组件的 state, props

- ### `StarRatingWrapper`

  - states: `currentRating` - number, 表示当前 rating 是多少,也就是当前多少星星亮着
  - props: 无

- ### `StarRating`

  - states: `hoveredIndex` - number ｜ null, 表示当前哪个星星被 hover 了
  - props:
    - `max` - number, 表示总共有多少星星, 来源于用户设定
    - `value` - number, 表示当前 rating 是多少,也就是当前多少星星亮着，来源于父级的`currentRating`
    - `changeValue`-function, 用来改变当前 rating value, 来源于父级的`currentRating`的 setter 函数

- ### `Star`

  - states: 无
  - props: `filled` - boolean,表示当前星星有没有被点亮，用来控制其 css 效果

## 👀 知识点

- `Array.from({ length: count })`的使用

  - 当你的 state 只是一个 integer number 的时候，你想通过它来创建数组，比如`test=3`,你想创造出`[0,1,2]`, 那么你就可以使用`Array.from({ length: test }).map((_,idx) => idx)`

- 当有多个 className 时候，可以通过`['classname1', somevariable && "classname2"].filter(Boolean).join(' ')`来生成 className list: `"classname1"` or `"classname1 classname2"`
- React 中箭头函数传参的细节：其中`e`是自带的，不用管，要是自己想传参， 那得被箭头函数包一层，比如下面的`onMouseEnter` `onMouseLeave` `onClick`:

  ```
  <div>
        {Array.from({ length: max }).map((_, index) => (
          <span
            key={index}
            tabIndex={0}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={() => handleMouseLeave(null)}
            onClick={() => handleClick(index)}
          >
            {/* key point is here: 是或的关系 */}
            <Star filled={index < hoveredIndex || index + 1 <= value} />
          </span>
        ))}
   </div>
  ```

## ♿ Accessibility (a11y)

- `Star`组件被 html `<span>`包裹且使用`tabIndex=0`来确定 keyboard navigation is good
