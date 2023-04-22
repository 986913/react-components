import { useState, useRef, useCallback } from 'react';

export const useFocus = () => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = useCallback(() => setIsFocus(false), []);
  const handleFocus = useCallback(() => setIsFocus(true), []);

  // 🟡使用useRef()生成ref对象
  const ref = useRef();

  const Ref = useCallback(
    (node) => {
      if (ref.current) {
        //为了在组件卸载时注销事件监听器，以避免潜在的问题。
        ref.current.removeEventListener('focus', handleFocus);
        ref.current.removeEventListener('blur', handleBlur);
      }

      //给ref.current赋值实际的引用
      ref.current = node;
      if (ref.current) {
        ref.current.addEventListener('focus', handleFocus);
        ref.current.addEventListener('blur', handleBlur);
      }
    },
    [handleBlur, handleFocus]
  );

  return [Ref, isFocus];
};
