## ▍基本语法

```javascript
const [isPending, startTransition] = useTransition();
```

**返回值**

* `isPending`：布尔值，表示是否有进行中的过渡任务
* `startTransition`：函数，用于包裹需要延迟处理的任务

**本质**：标记某些状态更新为"非紧急"，让 React 优先处理更重要的界面更新

## ▍最佳使用场景

### ✅ 该用的情况：

1. **大量数据计算**（如渲染超长列表）
2. **搜索/筛选实时反馈**（输入时即时响应）
3. **后台数据加载**（保持界面可交互）
4. **需要同时显示加载状态**（如转圈圈+保持界面响应）

### ❌ 不该用的情况：

1. 简单快速的操作（反而增加复杂度）
2. 必须同步完成的操作（如付款提交）
3. 不需要用户感知进度的任务

## ▍经典使用案例

### 场景 1：输入搜索优化

用户快速输入时不卡顿，自动抛弃中间结果

```javascript
function SearchBox() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleInput = (e) => {
    setInput(e.target.value); // 立即更新输入框
  
    startTransition(() => { // 延迟处理搜索
      searchAPI(e.target.value).then(setResults);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleInput} />
      {isPending ? <Spinner /> : <SearchResults data={results} />}
    </div>
  );
}
```

### 场景 2：列表筛选优化

处理大数据筛选时不冻结界面

```javascript
function FilterList({ items }) {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleFilter = (text) => {
    setFilter(text); // 立即显示输入
  
    startTransition(() => { // 后台处理复杂筛选
      const newList = items.filter(item => 
        item.name.includes(text)
      );
      setFiltered(newList);
    });
  };

  return (
    <div>
      <SearchInput value={filter} onChange={handleFilter} />
      {isPending && <LoadingOverlay />}
      <List items={filtered} />
    </div>
  );
}
```

## ▍关键特性总结

1. **优先级控制**：将包裹的任务标记为"可中断"
2. **Concurrent模式核心**：React 18+ 的重要优化手段
3. **双状态反馈**：通过 isPending 提供加载状态
4. **性能救星**：解决大数据量导致的界面冻结问题
