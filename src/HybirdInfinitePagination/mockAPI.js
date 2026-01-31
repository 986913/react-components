export const fetchPage = (pageId, signal) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: `${pageId}-${i}`,
        text: `Item ${i} from Page ${pageId}`,
      }));
      resolve(mockData);
    }, 1500); // 故意延迟，方便测试快速滚动

    // 如果信号取消，清除定时器并 reject
    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
};
