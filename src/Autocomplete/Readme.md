## 👨‍👧 组件关系

```
<AutocompleteWrapper>
    <Autocomplete/>
  <AutocompleteWrapper/>
```

## 🔢 各组件的 state, props

- ### `AutocompleteWrapper`

  - states:
    - `searchText` - string, required, 当前用户在输入框 type 的当前值，作为 props 传给 Autocomplete 组件
    - `setSearchText` - function, required, 当输入值变了用于更改`searchText`
  - props：无

- ### `Autocomplete`

  - props:s
    - `searchText` - string, 用于展示输入框的当前值
    - `setSearchText` - function, 用于更改输入框的当前值
    - `list`- array, 用于 api response list
  - states: 无

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

      /* 只有当debouncedSearchValue变的时候，才会去重新fetch API */
      const debouncedSearchValue = useDebounce(searchText, 500);
      useEffect(() => {
        console.log('用户停止type后,在这看fetch api');
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((res) => res.json())
          .then((res) => setData(res));
      }, [debouncedSearchValue]);

      /* 这是不用useDebounce的时候：
        useEffect(() => {
          console.log('用户停止type后，在这看fetch api goes crazy');
          fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((res) => setDta(res));
        }, [searchText]);
      */
    ```
