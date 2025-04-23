**一句话**：让某个值的更新"等一等"，优先让更重要的更新先走

## ▍基本语法

```javascript
const deferredValue = useDeferredValue(value);
```

**参数**：任意值（通常来自 state）

**返回值**：延迟版本的该值（React 自动控制延迟时机）

**本质**：告诉 React："这个值的更新可以往后排"

## ▍最佳使用场景

### ✅ 该用的情况：

1. **被动**接收变化的值（比如父组件传过来的 prop）
2. **无法直接控制更新源头时**（比如第三方库的状态）
3. **需要和用户输入同步但渲染复杂**（如超大列表随输入更新）

### ❌ 不该用的情况：

1. 能直接控制状态更新的情况（优先用`useTransition`）
2. 需要精确控制延迟时间的场景（用防抖/节流）
3. 简单快速的渲染操作

## ▍经典使用案例

### 场景：输入框 + 大数据列表

```javascript
function SearchResults({ query }) {
  // 父组件传来的 query 被动延迟
  const deferredQuery = useDeferredValue(query);
  
  // 用延迟后的值生成列表
  const list = Array(5000)
    .fill('')
    .map((_, i) => <div key={i}>{deferredQuery}</div>);

  return (
    <div>
      {/* 延迟时显示提示 */}
      {query !== deferredQuery && <div>更新中...</div>}
      <div>{list}</div>
    </div>
  );
}
```

## ▍useTransition VS useDeferredValue 大白话对比


|              | useTransition                             | useDeferredValue                    |
| ------------ | ----------------------------------------- | ----------------------------------- |
| **控制权**   | 你**主动**把任务标记为"不急" (生产者模式) | 某个值被动变成"慢半拍" (消费者模式) |
| **适用关系** | 你控制更新发起的位置                      | 你接收别人给的值时优化              |
| **代码位置** | 在触发更新的地方使用                      | 在使用值的地方使用                  |

### 🌰 具体例子对比：**

假设用户在搜索框输入:

**`useTransition`的做法：**

```
// 你主动说："更新列表这个事不急！"
setInput(value); // 紧急：立刻更新输入框
startTransition(() => {
  setList(filter(value)); // 不急：慢慢更新列表
});
```

**`useDeferredValue`的做法：**

```
// 列表自动用延迟后的值
const deferredValue = useDeferredValue(input); 
const list = filter(deferredValue); // 列表用延迟后的值计算
```
