来源： https://www.reacterry.com/portal/challenges/local-storage-1

## 🔢 组件的 state & props

### `App`

- props: 无
- state:
  - `val: string`
    - 当前 input 的 value
    - 初始值来自 `localStorage`

## 🧠 核心实现逻辑

### 1️⃣ Lazy Initialization（惰性初始化）

<pre class="overflow-visible! px-0!" data-start="351" data-end="454"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼ8">const</span><span> [</span><span class="ͼe">val</span><span>, </span><span class="ͼe">setVal</span><span>] </span><span class="ͼ8">=</span><span> </span><span class="ͼe">useState</span><span>(() => {</span><br/><span>  </span><span class="ͼ8">return</span><span> </span><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>getItem(</span><span class="ͼc">'inputValue'</span><span>) </span><span class="ͼ8">||</span><span> </span><span class="ͼc">''</span><span>;</span><br/><span>});</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### 为什么要用函数？

如果写成：

<pre class="overflow-visible! px-0!" data-start="477" data-end="537"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">useState</span><span>(</span><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>getItem(</span><span class="ͼc">'inputValue'</span><span>) </span><span class="ͼ8">||</span><span> </span><span class="ͼc">''</span><span>)</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

问题：

- 每次 render 都会执行 `localStorage.getItem`
- 即便 React 只使用第一次结果

使用函数形式：

<pre class="overflow-visible! px-0!" data-start="614" data-end="645"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">useState</span><span>(() => {...})</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

特点：

- 只在组件 **第一次 mount 时执行**
- 后续 re-render 不会重新执行

### 面试层理解

- `useState(initialValue)` → initialValue 在 render 阶段执行
- `useState(() => initialValue)` → 函数只在 mount 阶段执行

> 这是优化 IO 操作的手段
> 读取 localStorage 属于同步 IO

## 2️⃣ 副作用必须放在 `useEffect`

<pre class="overflow-visible! px-0!" data-start="897" data-end="978"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">useEffect</span><span>(() => {</span><br/><span>  </span><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>setItem(</span><span class="ͼc">'inputValue'</span><span>, </span><span class="ͼe">val</span><span>);</span><br/><span>}, [</span><span class="ͼe">val</span><span>]);</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

### 为什么不能直接写在组件体内？

如果写成：

<pre class="overflow-visible! px-0!" data-start="1007" data-end="1057"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>setItem(</span><span class="ͼc">'inputValue'</span><span>, </span><span class="ͼe">val</span><span>);</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

问题：

- 每次 render 都会执行
- 违反 “render 必须纯函数” 原则
- 造成不可控副作用

React 设计原则：

> render 阶段必须是 pure
> side effect 必须进入 commit 阶段

`useEffect` 就是 commit 阶段的入口。

## 👀 知识点拆解

### 1️⃣ localStorage 特性

- 同步 API
- 基于 key-value
- 只能存 string
- 容量有限（通常 \~5MB）
- 同源策略限制

### 2️⃣ 为什么必须使用 Effect

React 生命周期分两阶段：

| 阶段   | 是否允许副作用 |
| ------ | -------------- |
| Render | ❌ 不允许      |
| Commit | ✅ 允许        |

`useEffect` 在 commit 之后执行

## 🧩 常见错误

### ❌ 在 render 阶段写 localStorage

违反纯函数原则。

### ❌ 忘记 fallback

<pre class="overflow-visible! px-0!" data-start="2279" data-end="2323"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>getItem(</span><span class="ͼc">'inputValue'</span><span>)</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

可能返回 `null`。必须：|| ''

# 🧪 面试深挖点

### Q1：为什么 lazy init 只执行一次？

因为：

- React 在 commit 阶段初始化 Hook state
- 后续 re-render 复用同一个 Hook cell
- 不会再次执行 initializer

### Q2：为什么不能在条件里写 Hook？

因为：

- React 依赖 Hook 调用顺序
- Hook 是按index存储的

内部模型近似：

<pre class="overflow-visible! px-0!" data-start="2596" data-end="2633"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼe">hooks</span><span> </span><span class="ͼ8">=</span><span> []</span><br/><span class="ͼe">currentIndex</span><span> </span><span class="ͼ8">=</span><span> </span><span class="ͼb">0</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

顺序一旦变化，状态错位。

### Q3：这个组件有什么性能问题？

- 每次输入都写 localStorage
- localStorage 是同步 IO
- 高频输入会阻塞主线程

优化方案：

- debounce
- useRef 缓存
- 批量写入

## 🔥 升级版本（生产级思考）

真实项目中你会：

<pre class="overflow-visible! px-0!" data-start="2805" data-end="3106"><div class="relative w-full my-4"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼ8">const</span><span> </span><span class="ͼe">useLocalStorage</span><span> </span><span class="ͼ8">=</span><span> (</span><span class="ͼe">key</span><span>, </span><span class="ͼe">initialValue</span><span>) => {</span><br/><span>  </span><span class="ͼ8">const</span><span> [</span><span class="ͼe">value</span><span>, </span><span class="ͼe">setValue</span><span>] </span><span class="ͼ8">=</span><span> </span><span class="ͼe">useState</span><span>(() => {</span><br/><span>    </span><span class="ͼ8">const</span><span> </span><span class="ͼe">stored</span><span> </span><span class="ͼ8">=</span><span> </span><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>getItem(</span><span class="ͼe">key</span><span>);</span><br/><span>    </span><span class="ͼ8">return</span><span> </span><span class="ͼe">stored</span><span> </span><span class="ͼ8">??</span><span> </span><span class="ͼe">initialValue</span><span>;</span><br/><span>  });</span><br/><br/><span>  </span><span class="ͼe">useEffect</span><span>(() => {</span><br/><span>    </span><span class="ͼe">localStorage</span><span class="ͼ8">.</span><span>setItem(</span><span class="ͼe">key</span><span>, </span><span class="ͼe">value</span><span>);</span><br/><span>  }, [</span><span class="ͼe">key</span><span>, </span><span class="ͼe">value</span><span>]);</span><br/><br/><span>  </span><span class="ͼ8">return</span><span> [</span><span class="ͼe">value</span><span>, </span><span class="ͼe">setValue</span><span>];</span><br/><span>};</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

把逻辑抽成自定义 Hook。

## 🧱 总结结构

| 概念             | 作用            |
| ---------------- | --------------- |
| lazy init        | 避免重复 IO     |
| useEffect        | 管理副作用      |
| controlled input | 单向数据流      |
| 依赖数组         | 精准触发 effect |
| localStorage     | 持久化          |

## 🎯 一句话总结

这是一个：

> 利用 lazy state 初始化 + useEffect 同步副作用
> 实现持久化 controlled input 的基础题。
