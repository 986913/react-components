import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fetchPage } from './mockAPI';

// 假设我们知道每一页大概的高度，用于计算占位符
const ESTIMATED_PAGE_HEIGHT = 500;

export const Hybird = () => {
  const [pages, setPages] = useState({});
  // 记录已知的最大页码，用于计算占位符
  const [maxKnownPage, setMaxKnownPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageRefs = useRef(new Map());
  const bottomRef = useRef(null);
  // 使用 Map 存储正在进行的请求，用于去重
  const inflightRequests = useRef(new Map());
  const isInternalScrolling = useRef(false);

  // --- 核心逻辑：加载数据 (增强版：支持静默加载和去重) ---
  const loadData = useCallback(
    async (pageId, isSilent = false) => {
      // 1. 检查缓存
      if (pages[pageId]) return;
      // 2. 检查是否正在请求中 (去重)
      if (inflightRequests.current.has(pageId)) return;

      if (!isSilent) setLoading(true);

      const controller = new AbortController();
      inflightRequests.current.set(pageId, controller);

      try {
        console.log(
          `Fetching page ${pageId} (${isSilent ? 'silent' : 'active'})...`,
        );
        const data = await fetchPage(pageId, controller.signal);

        setPages((prev) => ({ ...prev, [pageId]: data }));
        setMaxKnownPage((prev) => Math.max(prev, pageId));
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        inflightRequests.current.delete(pageId);
        if (!isSilent && inflightRequests.current.size === 0) {
          setLoading(false);
        }
      }
    },
    [pages],
  );

  // --- 新逻辑：智能预加载 (Pre-fetching) ---
  useEffect(() => {
    // 当 currentPage 变化时，预加载前后页
    // 使用 setTimeout 来防抖，避免用户快速滑动页码时触发过多请求
    const timer = setTimeout(() => {
      if (currentPage > 1) {
        loadData(currentPage - 1, true); // Silent load previous
      }
      loadData(currentPage + 1, true); // Silent load next
    }, 300); // 300ms 防抖

    return () => clearTimeout(timer);
  }, [currentPage, loadData]);

  // --- 原有逻辑 1：底部的无限滚动 ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // 找到当前最大的页码，加载下一页
          const currentMaxPage = Math.max(...Object.keys(pages).map(Number), 0);
          loadData(currentMaxPage + 1);
        }
      },
      { rootMargin: '200px' },
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [pages, loading, loadData]);

  // --- 原有逻辑 2：视口页码追踪 ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isInternalScrolling.current) return;
        // 找出可视区域中面积最大的那一页
        let maxRatio = 0;
        let targetPage = currentPage;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            targetPage = Number(entry.target.dataset.page);
          }
        });
        if (targetPage !== currentPage) {
          setCurrentPage(targetPage);
        }
      },
      { threshold: [0.1, 0.5, 0.9] }, // 多个阈值提高精度
    );
    pageRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pages, currentPage]);

  // --- 原有逻辑 3：跳转处理 (针对稀疏数据优化) ---
  const handleJump = async (pageNumber) => {
    isInternalScrolling.current = true;
    setCurrentPage(pageNumber);
    // 如果跳转的页码比当前知的最大页码还大，更新它以计算占位符
    setMaxKnownPage((prev) => Math.max(prev, pageNumber));

    if (!pages[pageNumber]) {
      await loadData(pageNumber);
    }

    // 滚动逻辑不变...
    requestAnimationFrame(() => {
      const targetNode = pageRefs.current.get(pageNumber);
      if (targetNode) {
        targetNode.scrollIntoView({ behavior: 'auto' }); // 跳转通常用 auto 而不是 smooth
        setTimeout(() => {
          isInternalScrolling.current = false;
        }, 500);
      }
    });
  };

  // --- 渲染逻辑：处理稀疏数组和占位符 ---
  const renderPages = () => {
    const renderedNodes = [];
    // 我们需要遍历从 1 到 maxKnownPage 的所有可能页面
    for (let i = 1; i <= maxKnownPage; i++) {
      if (pages[i]) {
        // 如果这页有数据，渲染真实内容
        renderedNodes.push(
          <div
            key={i}
            className='page-block'
            data-page={i}
            ref={(el) => {
              if (el) pageRefs.current.set(i, el);
              else pageRefs.current.delete(i);
            }}
          >
            <h3>Page {i}</h3>
            {pages[i].map((item) => (
              <div key={item.id} className='item-card'>
                {item.text}
              </div>
            ))}
          </div>,
        );
      } else {
        // 如果这页没数据（比如跳过了），渲染一个占位符
        // 占位符不需要 ref，不需要被观察
        renderedNodes.push(
          <div
            key={`gap-${i}`}
            style={{
              height: ESTIMATED_PAGE_HEIGHT,
              background:
                'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fff 10px, #fff 20px)',
            }}
            className='page-gap'
          >
            Missing Page {i}
          </div>,
        );
      }
    }
    return renderedNodes;
  };

  return (
    <div className='container'>
      <div className='scroll-viewport'>
        {renderPages()}
        <div ref={bottomRef} className='sentinel'>
          {loading ? 'Loading...' : 'Pull to load more'}
        </div>
      </div>
      {/* Pagination UI same as before... */}
      <nav
        className='pagination'
        style={{
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          gap: 5,
          flexWrap: 'wrap',
          background: 'white',
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={currentPage === num ? 'active' : ''}
            onClick={() => handleJump(num)}
          >
            {num}
          </button>
        ))}
      </nav>
    </div>
  );
};
