import { useUpdateEffect } from './useUpdateEffect';
import { useEffect, useState } from 'react';

export default function App() {
  /*********************** Hooks usages *************************/
  useUpdateEffect(() => {
    console.log('useUpdateEffect test');
  }, []);

  useEffect(() => {
    console.log('useEffect test');
  }, []);

  return (
    <div className='App'>
      <h3>useUpdateEffect</h3>
      <p>
        打开console台看不同：
        自定义的useUpdateEffect首次没渲染，其余和useEffect一摸一样
      </p>
    </div>
  );
}
