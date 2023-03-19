import { useState } from 'react';

export const Cascader = ({ dataSource }) => {
  const [selectedItem, setSelectedItem] = useState(dataSource[0].name);
  const [rightList, setRightList] = useState(dataSource[0].children);

  const handleOnChange = (e) => {
    const value = e.target.value;

    setSelectedItem(value);

    dataSource.forEach((item) => {
      if (item.name === value) setRightList(item.children);
    });
  };

  return (
    <section>
      <select value={selectedItem} onChange={handleOnChange}>
        {dataSource.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
      <select>
        {rightList.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </section>
  );
};
