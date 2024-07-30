## 👨‍👧 组件关系

```
<NestedCheckbox>
```

## 🔢 各组件的 state, props

- ### `ProgressBarWrapper`

  - props: `dataConfig` - object, 初始渲染的所有值
  - states: `initData` - object, 来源是 props 的`dataConfig`. 组件用 `initData`来渲染所有值

## 🪜 组件思路

1. 先确定外部能提供初始渲染值`dataConfig` as props
2. 把`dataConfig`原封不动的存为 state 的`initData`, 因为你要后期更改 data 的, 你是不能直接更改 props, 所有要放到 states

   ```
     const [initData, setInitData] = useState(dataConfig);

     useEffect(() => {
       setInitData(dataConfig);
     }, [dataConfig]);
   ```

3. 写递归函数`renderData`去递归的生产 JSX UI looks:

   确认`renderData`函数参数:

   - `curData` - object, 用来表示当前层的 data, (有或者没有`children`这俩情况都可能存在)
   - `changeCurDate` - function, 用来更新 local state `initData`的

   确认`renderData`函数返回值：

   - return JSX element, 所以先想好 UI 长什么样, 填上对应的变量, 附上对应的 css

   确认`renderData`函数 base condition：

   ```
   if (!curData || !curData.label) return null;
   ```

   确认`renderData`函数单层逻辑: 用 JSX 展示当前层的信息

   ```
   <div className='checkbox-list' key={value}>
         <input
           type='checkbox'
           value={value}
           id={`${label}Input`}
           checked={isChecked}
           onChange={handleOnchange}
           ref={(el) => el && (el.indeterminate = indeterminate)}
         />
         <label htmlFor={`${label}Input`}>{label}</label>
    </div>
   ```

   确认`renderData`函数递归层: 当前层有 children 时,children map 递归调用

   ```
      {  /* recursion render child 1 by 1 */  }
         {  children &&
            children.length > 0 &&
            children.map((child) => renderData(child, changeCurData))
         }
   ```

4. 给 checkbox 的`onChange`进行事件绑定，用于更新 state 中的`initData`

   ```
        <input
           type='checkbox'
           value={value}
           id={`${label}Input`}
           checked={isChecked}
           onChange={handleOnchange}    <------ 事件绑定
           ref={(el) => el && (el.indeterminate = indeterminate)}
        />


      const handleOnchange = (e) => {
       const { value: selectedVal, checked: checkedStatus } = e.target;
       const updatedData = traversalAndUpdate(
         { ...usaLoactions },  <-- 使用full set data
         selectedVal,
         checkedStatus
       );
       changeCurData(updatedData);  <--- 得到最新的更新后的updateData，然后间接调用setState去变state
     };

   ```

## 👁️ 知识点

- React 中如何写递归函数？这个组件中有三个递归函数：

  - `renderData` - 详情见上
  - `traversalAndUpdate`

    ```
    /* 输入：当前层data, 被点击的checkbox value, 被点击的checkbox的checked状态
       输出：改变后的当前层data */

    export const traversalAndUpdate = (data, selectedValue, isSelectedchecked) => {
      // 如果当前节点的值与选中的值相同，更新当前节点及其所有子节点的选中状态
      if (data.value === selectedValue) {
        modifyChecked(data, isSelectedchecked);
      }
      // 如果当前节点不是选中的节点，但它有子节点，则递归继续在子节点中查找并更新状态。
      else if (data.children) {
        data.children = data.children.map((child) =>
          traversalAndUpdate(child, selectedValue, isSelectedchecked)
        );
      }

      //现在是递归返回时，返回到data层, 通过updateParentStatus更新当前节点（也就是子节点的父节点的）状态。
      const updatedData = modifyParentChecked(data);

      // 返回更新后的数据结构
      return updatedData;
    };
    ```

  - `modifyChecked`

    ```
    /* 输入：当前层data, 当前层dom的checked状态
       输出：改变后的当前层data和子层 */

    const modifyChecked = (node, isChecked) => {
      node.isChecked = isChecked;
      node.indeterminate = false;

      if (node.children) {
        node.children.forEach((child) => modifyChecked(child, isChecked));
      }
      return node;
    };
    ```
