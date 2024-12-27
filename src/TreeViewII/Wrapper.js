import React, { useState, useEffect } from 'react';
import { TreeView } from './TreeView';
import './treeview.css';
import { getRoot, getSubFolderForParent, getSubFilesForParent } from './fetch';

/* TreeViewWrapperII as parent component, shows how to use TreeView component: */
export const TreeViewWrapperII = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const data = getRoot();
    setDataSource(data);
  }, []);

  const loadSubData = (e, folder) => {
    e.stopPropagation();
    const { id, name } = folder;
    const subFolders = getSubFolderForParent(name);
    const subFiles = getSubFilesForParent(name);
    const newSourceData = recurrsionInsertData(
      dataSource,
      subFolders,
      subFiles,
      id
    );
    setDataSource(newSourceData);
  };

  const recurrsionInsertData = (
    data,
    insertFolders,
    insertFiles,
    insertPlaceID
  ) => {
    return data.map((d) => {
      if (d.children && d.children.length > 0) {
        // recurrsion here
        recurrsionInsertData(
          d.children,
          insertFolders,
          insertFiles,
          insertPlaceID
        );
      }
      if (d.id === insertPlaceID) {
        d.children = insertFolders.concat(insertFiles);
      }
      return d;
    });
  };

  return (
    <TreeView
      dataSource={dataSource}
      onClickCallback={(e, folder) => {
        loadSubData(e, folder);
      }}
    />
  );
};
