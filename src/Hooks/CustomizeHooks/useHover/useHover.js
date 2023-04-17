import { useState, useRef, useCallback, useEffect } from 'react';
/*----------------------- solution 1 --------------------------- */
export const useHover1 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = useCallback(() => setIsHovered(true), []);
  const handleMouseOut = useCallback(() => setIsHovered(false), []);

  // 🟡使用useRef()生成ref对象
  const ref = useRef();

  useEffect(() => {
    ref.current.addEventListener('mouseover', handleMouseOver);
    ref.current.addEventListener('mouseout', handleMouseOut);

    // 为了在组件卸载时注销事件监听器，以避免潜在的问题。
    return () => {
      ref.current.removeEventListener('mouseover', handleMouseOver);
      ref.current.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseOver, handleMouseOut]);

  return [ref, isHovered];
};

/*----------------------- solution 2 --------------------------- */
export const useHover2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  /**
   * 在这个例子中，如果不使用 useCallback 包裹 handleMouseOver，那么每次渲染时都会创建一个新的函数引用，即使函数本身的代码并没有发生变化。
   * 这会导致组件每次渲染都会重新注册事件监听器，从而降低性能。
   * 而使用 useCallback 可以确保 handleMouseOver 只在它的依赖项发生变化时才会被重新创建，从而提高性能。
   */
  const handleMouseOver = useCallback(() => setIsHovered(true), []);
  const handleMouseOut = useCallback(() => setIsHovered(false), []);

  // 🟡使用useRef()生成ref对象
  const ref = useRef();

  // Use a callback ref instead of useEffect so that event listeners get changed in the case that the returned ref gets added to a different element later. With useEffect, changes to ref.current wouldn't cause a rerender and thus the effect would run again.
  const Ref = useCallback(
    (node) => {
      if (ref.current) {
        //为了在组件卸载时注销事件监听器，以避免潜在的问题。
        ref.current.removeEventListener('mouseover', handleMouseOver);
        ref.current.removeEventListener('mouseout', handleMouseOut);
      }

      //给ref.current赋值实际的引用
      ref.current = node;
      if (ref.current) {
        ref.current.addEventListener('mouseover', handleMouseOver);
        ref.current.addEventListener('mouseout', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [Ref, isHovered];
};
