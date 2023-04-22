// This is a React problem from BFE.dev

import { useState, useCallback } from 'react';

export function useArray(initialValue) {
  const [state, updateState] = useState(initialValue);

  const push = useCallback((newItem) => {
    updateState((prev) => {
      return [...prev, newItem];
    });
  }, []);

  const removeByIndex = useCallback((index) => {
    updateState((prev) => {
      const copiedState = prev.slice(); // make an copy
      copiedState.splice(index, 1);
      return copiedState;
    });
  }, []);

  return {
    value: state,
    push,
    removeByIndex,
  };
}

/**
  useCallback的主要作用是返回一个记忆化的回调函数，以便在子组件中传递函数时能够确保其稳定性，从而避免不必要的渲染和性能问题。但无论如何，这个回调函数在被触发时都将被执行
      举个例子，如果我们没有使用 useCallback，那么每次组件重新渲染时，push 和 removeByIndex 函数都会被重新创建。
      这可能会导致子组件的重新渲染，因为它们可能会比较引用的不同而判断出现了变化，从而导致不必要的性能开销

      而当我们使用了 useCallback 时，push 和 removeByIndex 函数的引用会被稳定下来，即使 state 状态改变了，
      这些函数的引用也不会发生变化。这就避免了不必要的组件重渲染，从而提高了性能
 */
