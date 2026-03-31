# React 面试卡点总结（Timer & Ref 相关）

## 目的

记录在实现 `useTimer` 过程中暴露的逻辑细节与 Hooks 执行机制盲区，确保在手写面试中达到“零错误”表现

# 一、 定时器模型误区

## 1.1 `setTimeout` vs `setInterval`

### 问题表现

- 习惯性使用 `setTimeout` 导致计数器只运行一次（非循环）。
- 忘记在 `useEffect` 依赖项中处理开启/关闭逻辑，导致状态切换失效。

### 正确认知

| 场景         | 推荐 API                | 关键点                                |
| :----------- | :---------------------- | :------------------------------------ |
| **单次延时** | `window.setTimeout`     | 执行完即销毁                          |
| **持续计数** | `window.setInterval`    | 需由`isRunning` 状态显式驱动开启/关闭 |
| **高频动画** | `requestAnimationFrame` | 性能最高，适合 60fps 视觉更新         |

### 记忆规则

> 需要“持续、等距”的动作 → 使用 `setInterval`。

---

# 二、 React Hooks 核心细节

## 2.1 `useRef` 的身份定位 (Identity)

### 核心认知

- `useRef` 返回的是一个**持久化对象**，其 `.current` 属性在整个 Lifecycle 内保持不变。
- **修改 `ref.current` 不会触发 Re-render**。这使它成为存储 Interval ID 的唯一选择。

### 关键代码

```javascript
const timerRef = useRef(null);

// 赋值
timerRef.current = setInterval(...);

// 清理
if (timerRef.current) clearInterval(timerRef.current);
```

## 2.2 闭包陷阱与函数式更新

### 错误写法

**JavaScript**

```
setCount(count + 1);      // 依赖旧闭包，可能拿到 stale data
setCount(prev => prev++); // 后置自增：返回原值再加，state 永远不变
```

### 正确写法

**JavaScript**

```
setCount(prev => prev + 1); // 永远基于最新的内部 Internal State
```

---

# 三、 依赖项优化 (Dependency Graph)

## 3.1 冗余依赖识别

### 问题表现

- 在 `reset` 函数中加入了不必要的 `isRunning` 依赖。

### 优化模型

- **原则**：只添加函数体中**读取 (Read)** 到的变量。
- **Setter 安全性**：React 保证 `setCount` 和 `setIsRunning` 的引用在渲染间是稳定的，不需要放入依赖数组。

### 优化对比

**JavaScript**

```
// ❌ 冗余版：每次切换 Start/Stop 都会重新创建 reset 函数
const reset = useCallback(() => {...}, [initialCount, isRunning]);

// ✅ 精简版：仅当初始值变动时才重刷引用
const reset = useCallback(() => {
  setIsRunning(false);
  setCount(initialCount);
}, [initialCount]);
```

---

# 四、 事件清理 (Cleanup)

## 4.1 内存泄漏 (Memory Leak) 预防

### 必须形成肌肉记忆

只要在 `useEffect` 里启动了外部订阅或定时器，**必须在 return 中销毁**。

**JavaScript**

```
useEffect(() => {
  // ... 执行逻辑
  return () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
}, [isRunning]);
```

---

# 五、 能力诊断 (Self-Diagnosis)

| **维度**                   | **当前状态** | **备注**                          |
| -------------------------- | ------------ | --------------------------------- |
| **逻辑解耦 (Custom Hook)** | 优秀         | 能够独立抽离业务逻辑              |
| **闭包陷阱识别**           | 良好         | 需警惕自增运算符`++`的陷阱        |
| **Ref 持久化思维**         | 良好         | 理解了非渲染态数据的存储          |
| **依赖项精简意识**         | **需加强**   | 需严格审查`useCallback`的依赖数组 |
|                            |              |                                   |

---

# 六、 核心改进方向

1. **Ref 闭环**：创建定时器必存 Ref，Effect 结束必清 Ref。
2. **函数式更新**：只要 state 依赖于旧 state，必写 `prev => ...`。
3. **依赖最小化**：剔除依赖数组中“仅写入、未读取”的变量。

---

# 总结

当前 React 逻辑非常扎实，主要提升点在于**对 Hooks 依赖收集的极致精简**以及**浏览器原生 API 的自动化反应**。

> **"Don't just write code, manage the lifecycle."**
