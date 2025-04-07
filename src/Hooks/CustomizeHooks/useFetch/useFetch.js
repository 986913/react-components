import { useState, useEffect } from 'react';

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const useFetch = (url) => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    /* 
      doUpdate 是一个优雅的防干扰机制，确保只有最新的请求能更新组件状态，同时避免组件卸载后的无效状态更新。
      这是 React 异步操作中处理racing condition和memory leak的常见模式 
    */
    let doUpdate = true;

    setStatus(STATUS.LOADING);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (doUpdate) {
          setData(data);
          setStatus(STATUS.SUCCESS);
        }
      })
      .catch((e) => {
        if (doUpdate) {
          setStatus(STATUS.ERROR);
          setError(e);
        }
      });

    return () => (doUpdate = false); // <--- 清理函数将 ❗上一次渲染周期的 doUpdate 设为 false
  }, [url]);

  return {
    data,
    status,
    error,
  };
};

/******************************************************************
  doUpdate示例流程:
  1. 用户第一次请求 url1：
      doUpdate = true（初始值）
      发送请求，❗假设响应很很很...慢❗

  2. 用户快速切换到 url2：
      清理函数执行：将 url1 对应的 doUpdate 设为 false
      新的 useEffect 执行：创建新 doUpdate = true，发送 url2 请求

  3. 旧请求（url1）完成：
      检查 doUpdate（此时为 false），不更新状态
      避免错误更新

  4. 新请求（url2）完成：
      检查 doUpdate（仍为 true），正常更新状态
******************************************************************/
