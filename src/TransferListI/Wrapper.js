import React from 'react';
import { useState } from 'react';
import { TransferList } from './TransferList';

export const TransferListWrapperI = () => {
  // mock data:
  const initialAllTags = [
    { name: 'tag 0', key: 'tag0', path: 'path' },
    { name: 'tag 1', key: 'tag1', path: 'path' },
    { name: 'tag 2', key: 'tag2', path: 'path' },
    { name: 'tag 3', key: 'tag3', path: 'path' },
    { name: 'tag 4', key: 'tag4', path: 'path' },
    { name: 'tag 5', key: 'tag5', path: 'path' },
    { name: 'tag 6', key: 'tag6', path: 'path' },
    { name: 'tag 7', key: 'tag7', path: 'path' },
    { name: 'tag 8', key: 'tag8', path: 'path' },
    { name: 'tag 9', key: 'tag9', path: 'path' },
    { name: 'tag 10', key: 'tag10', path: 'path' },
  ];
  const [targetKeys, setTargetKeys] = useState(
    // 在这定义左边/右边data自定义初始化
    initialAllTags.filter((item, index) => index > 8).map((item) => item.key)
  );

  // callback函数而已
  const onChange = (nextLeftItems, nextTargetItems, moveKey) => {
    // console.log(nextLeftItems, nextTargetItems, moveKey);
    // setTargetKeys(nextTargetItems.map(item => item.key));
  };

  return (
    <div>
      <h1>Transfer List</h1>
      <TransferList
        dataSource={initialAllTags}
        title={['All tags', 'Selected Tags']}
        targetKeys={targetKeys}
        onChange={onChange}
      />
    </div>
  );
};
