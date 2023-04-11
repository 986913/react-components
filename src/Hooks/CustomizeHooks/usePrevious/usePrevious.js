import { useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  /**
   * useRef 返回的是一个对象，该对象的 current 属性可以存储任何值，
   * 并且在组件渲染过程中保持不变。因此，即使组件重新渲染，ref.current 中存储的值也不会发生变化，除非你显式地更新它。
   * 这正是 usePrevious hook 利用 useRef 来实现在组件渲染之间存储值的原理。
   */
  let ref = useRef();

  // Store current value in ref while value changes
  useEffect(() => {
    ref.current = value; //显式地更新ref.current, 因为ref.current不会因为组建渲染而重新自动被赋值
  }, [value]);

  //返回之前存储在 ref.current 中的值，也就是上一个渲染周期的值。
  return ref.current;
};
