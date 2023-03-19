import React from 'react';
import { TreeView } from './TreeView';

const mockData = [
  {
    title: '中国',
    key: 'china',
    children: [
      {
        title: '北京直辖市',
        key: 'beijing',
      },
      {
        title: '陕西',
        key: 'shaanxi',
        children: [
          {
            title: '西安',
            key: 'xian',
            children: [
              {
                title: '长安区',
                key: 'changan',
                children: [{ title: '明月她家', key: 'ming' }],
              },
              {
                title: '碑林区',
                key: 'beilin',
              },
            ],
          },
          {
            title: '宝鸡',
            key: 'baoji',
          },
        ],
      },
      {
        title: '上海直辖市',
        key: 'shanghai',
      },
      {
        title: '四川',
        key: 'sichuan',
        children: [
          {
            title: '成都',
            key: 'chengdu',
          },
        ],
      },
      {
        title: '山西',
        key: 'shanxi',
        children: [
          {
            title: '太原',
            key: 'Taiyuan',
          },
          {
            title: '吕梁',
            key: 'lvliang',
          },
        ],
      },
      {
        title: '云南',
        key: 'yunnan',
        children: [
          {
            title: '昆明',
            key: 'kunming',
          },
        ],
      },
    ],
  },
  {
    title: 'USA',
    key: 'usa',
    children: [
      {
        title: 'Michigan',
        key: 'michigan',
        children: [
          {
            title: 'Detroit',
            key: 'detroit',
          },
        ],
      },
      {
        title: 'Texas',
        key: 'texas',
        children: [
          {
            title: 'Austin',
            key: 'austin',
          },
        ],
      },
    ],
  },
];

export const TreeViewWrapperI = () => {
  // note: defaultExpandedKeys 等会再实现
  return <TreeView treeData={mockData} defaultExpandedKeys={['china']} />;
};
