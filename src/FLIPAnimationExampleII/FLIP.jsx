import {
  cloneElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const Flip = ({ children }) => {
  // 用于存储每个子元素的 DOM 节点引用
  const domMapRef = useRef({});
  // 用于存储每个子元素的初始位置坐标
  const startPositionsRef = useRef({});

  // 用于存储每个子元素的样式（如 transform 和 transition）
  const [styleMap, setStyleMap] = useState({});
  // 用于存储每个子元素的动画完成事件处理函数
  const [eventMap, setEventMap] = useState({});

  useLayoutEffect(() => {
    children.forEach(child => {
      const key = child.key;

      // 获取子元素的初始位置
      const start = startPositionsRef.current[key];
      
      // 获取子元素的当前（新）位置
      const end = domMapRef.current[key].getBoundingClientRect();
      
      // 计算子元素的位移差
      const deltaX = start.left - end.left;
      const deltaY = start.top - end.top;

      // 如果子元素没有移动，直接返回
      if (deltaX === 0 && deltaY === 0) return;

      // 记录子元素的新位置，为下一次动画做准备
      startPositionsRef.current[key] = domMapRef.current[key].getBoundingClientRect();

      // 关闭 transition，将子元素偏移至其初始位置
      setStyleMap(data => ({
        ...data,
        [key]: { transition: '', transform: `translate(${deltaX}px, ${deltaY}px)` },
      }));

      // 下一帧开启 transition，使子元素回到其新位置
      requestAnimationFrame(() => {
        setStyleMap(data => ({
          ...data,
          [key]: { transition: 'transform 2s', transform: '' },
        }));
      });

      // 在 FLIP 动画完成后，清理子元素的样式
      setEventMap(events => ({
        ...events,
        [key]: () => {
          setStyleMap(data => ({ ...data, [key]: { transition: '', transform: '' } }));
        },
      }));
    });
  }, [children]);

  return (
    <>
      {children.map(child =>
        cloneElement(child, {
          key: child.key,
          ref: (node) => {
            // 当节点存在且尚未被记录时，记录其引用及初始位置
            if (node && !domMapRef.current[child.key]) {
              domMapRef.current[child.key] = node;
              startPositionsRef.current[child.key] = node.getBoundingClientRect();
            }
          },
          // 合并子元素原有样式和 FLIP 动画的样式
          style: { ...child.props.style, ...styleMap[child.key] },
          // 绑定动画完成事件处理函数
          onTransitionEnd: eventMap[child.key],
        })
      )}
    </>
  );
};
