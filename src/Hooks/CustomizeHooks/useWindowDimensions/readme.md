# React 面试卡点总结（Window & Resize 相关）

## 目的

记录在实现 `useWindowSize` 过程中暴露出的知识盲区，形成针对性强化清单

# 一、浏览器对象使用混淆

## 1.1 window vs document 不清晰

### 问题表现

- 不确定使用 `window` 还是 `document`
- 对 viewport 概念不够清晰

### 正确认知

| 场景         | 使用对象                   |
| ------------ | -------------------------- |
| 视口尺寸     | `window`                   |
| DOM 操作     | `document`                 |
| 页面滚动监听 | `window`                   |
| 整个文档高度 | `document.documentElement` |

### 记忆规则

> 只要是 viewport（可视区域）相关 → 使用 `window`

---

# 二、浏览器 API 不熟练

## 2.1 忘记 `innerWidth` / `innerHeight`

### 高频 API（必须形成肌肉记忆）

<pre class="overflow-visible! px-0!" data-start="491" data-end="537"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>window</span><span>.</span><span>innerWidth</span><span>
</span><span>window</span><span>.</span><span>innerHeight</span><span>
</span></span></code></div></div></pre>

### 面试层级要求

- 能直接写出
- 不需要查文档
- 不需要试错

---

## 2.2 忘记 `resize` 事件名称

### 高频 Window 事件

| 事件         | 用途         |
| ------------ | ------------ |
| resize       | 窗口尺寸变化 |
| scroll       | 页面滚动     |
| load         | 页面加载完成 |
| beforeunload | 页面关闭前   |

### 关键点

<pre class="overflow-visible! px-0!" data-start="744" data-end="796"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>window</span><span>.</span><span>addEventListener</span><span>(</span><span>'resize'</span><span>, handler)
</span></span></code></div></div></pre>

事件名没有 `on` 前缀。

---

# 三、React 初始化模型不牢固

## 3.1 state 初始值不正确

### 错误思路

<pre class="overflow-visible! px-0!" data-start="870" data-end="891"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>useState</span><span>(</span><span>0</span><span>)
</span></span></code></div></div></pre>

导致：

- 首次 render 显示错误数据
- 必须等待 resize 才更新

---

### 正确思路

state 表示“当前窗口尺寸”

→ 初始化就应为当前尺寸

<pre class="overflow-visible! px-0!" data-start="983" data-end="1071"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>useState</span><span>(</span><span>() =></span><span> ({
  </span><span>width</span><span>: </span><span>window</span><span>.</span><span>innerWidth</span><span>,
  </span><span>height</span><span>: </span><span>window</span><span>.</span><span>innerHeight</span><span>
}))
</span></span></code></div></div></pre>

### 关键知识点

- Lazy initialization
- 初始 render 数据必须正确

---

# 四、事件清理意识不足

## 4.1 removeEventListener 使用不完整

### 错误写法

<pre class="overflow-visible! px-0!" data-start="1189" data-end="1235"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>window</span><span>.</span><span>removeEventListener</span><span>(</span><span>'resize'</span><span>)
</span></span></code></div></div></pre>

### 正确写法

必须传入相同 handler 引用：

<pre class="overflow-visible! px-0!" data-start="1267" data-end="1446"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>useEffect</span><span>(</span><span>() =></span><span> {
  </span><span>const</span><span> </span><span>handler</span><span> = (</span><span></span><span>) => {}

  </span><span>window</span><span>.</span><span>addEventListener</span><span>(</span><span>'resize'</span><span>, handler)

  </span><span>return</span><span> </span><span>() =></span><span> {
    </span><span>window</span><span>.</span><span>removeEventListener</span><span>(</span><span>'resize'</span><span>, handler)
  }
}, [])
</span></span></code></div></div></pre>

---

# 五、能力诊断

| 维度              | 当前状态 |
| ----------------- | -------- |
| React Hooks 基础  | 良好     |
| 自定义 Hook 思路  | 良好     |
| 浏览器 API 熟练度 | 需要加强 |
| 初始化思维模型    | 需要强化 |
| 面试稳定度        | 中等     |

---

# 六、强化训练建议

## 必做 3 个变种练习

1. `useWindowDimensions`
2. `useScrollPosition`
3. `useOnlineStatus`

目标：

- 不查资料写出完整版本
- 包含初始化
- 包含 cleanup
- 事件名准确
- handler 引用正确

---

# 七、核心改进方向

1. 建立 viewport → window 的条件反射
2. 高频 API 必须背熟
3. state 初始化必须语义一致
4. effect 一定包含清理函数

---

# 总结

当前问题不在 React 逻辑。

问题在：

- 浏览器原生 API 自动化程度不足
- **React 初始化思维未完全内化**

属于可快速修复型短板。
