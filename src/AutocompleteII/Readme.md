## 👨‍👧 组件关系

> 这题和 AutoComplete 几乎一样，只不过是用的 mockData, 没有 fetch API 而已

```
<AutocompleteWrapperII>
    <Autocomplete/>
  <AutocompleteWrapperII/>
```

## 🔢 各组件的 state, props

- ### `AutocompleteWrapperII`: 没实际作用

  - states/props：无

- ### `Autocomplete`

  - states:
    - `searchText` - string, 用于展示输入框的当前值
    - `list`- array, 用于显示当前 list
  - props： 无

## 👀 知识点

思路：可以先写一个最简单的版本：无`useDebounce` 版本， 然后升级为优化版：

- `useDeboune`的实现和使用：

  - 实现：

    ```
     import React, {useState, useEffect} from 'react';

    const useDebounce = (value, delay) => {
        // State and setters for debounced value
        const [debouncedVal, setDebouncedVal] = useState(value);

        useEffect(() => {
            const timer = setTimeout(() => {
               // Update debounced value after delay
               setDebouncedVal(value)
            }, delay)
            // clean up
            return () => clearTimeout(timer)
        }, [value, delay]) // Only re-call effect if value or delay changes
      );

        return debouncedVal;
    }
    ```

  - 使用：

    ```

      const debouncedSearchTerm = useDebounce(searchText, 500);
      useEffect(() => {
          console.log('用户停止type后,在这看更改list');
          const filteredList = USA_STATES.filter((item) =>
            item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setList(filteredList);
      }, [debouncedSearchTerm]);

      /* 这是不用useDebounce的时候：
        useEffect(() => {
          console.log('用户type时,在这看更改list goes crazy');
          const filteredList = USA_STATES.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()));
          setList(filteredList);
        }, [searchText]);
      */
    ```
