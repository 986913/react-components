import { useHover1, useHover2 } from './useHover';

export default function App() {
  /*********************  hook usage ****************************************/
  const [hoverRef2, isHovered] = useHover2();

  return (
    <div className='App'>
      <h3>use hover2: </h3>
      {/* 在这个例子中，hoverRef是useHover钩子返回的一个回调函数，它被传递给了一个 div 元素的 ref 属性中。
        这样，当这个 div 元素被渲染到页面上时，hoverRef 将会被调用，它将接收到这个 div 元素的引用。
        然后，useHover 钩子内部的逻辑将会根据鼠标的悬停状态更新 isHovered 状态，从而更新组件的显示内容 */}
      {/*  🟡jsx element 使用 ref to match useRef() */}
      return <div ref={hoverRef2}>{isHovered ? '😁' : '☹️'}</div>
    </div>
  );
}
