import { useEffect, useState } from 'react';

/* 与JS的debounce函数不同的是:
    useDebounce参数是value(string)和wait(nums), 
    js的debounce参数是func(function)和wait(nums), 
 */

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      /* Cancel the timeout if value changes (also on delay change or unmount). 
        This is how we prevent debounced value from updating if value is changed within the delay period. 
        Timeout gets cleared and restarted.
      */
      return () => clearTimeout(handler);
    },
    [value, delay] // Only re-call if value or delay changes
  );

  return debouncedValue;
};

/**
 * 知识点：
 *
 * 当value或delay变化时，useEffect的回调函数将重新运行，从而导致在新的setTimeout实例被创建之前清除上一个setTimeout实例的handler。
 * 这个清除操作是通过useEffect的返回函数实现的，因为它在下一次运行回调函数之前被调用。
 * 因此，每当value或delay变化时，都会重新创建一个新的setTimeout实例，并取消上一个setTimeout实例，以确保只有最后一个setTimeout实例能够更新debouncedValue的值。
 * 在组件卸载时，返回函数也会被调用，以清除尚未执行的setTimeout实例，从而避免内存泄漏
 */
