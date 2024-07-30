/********************************** 递归函数：遍历并更新data *****************************************/
export const traversalAndUpdate = (data, selectedValue, isSelectedchecked) => {
  // 如果当前节点的值与选中的值相同，更新当前节点及其所有子节点的选中状态
  if (data.value === selectedValue) {
    modifyChecked(data, isSelectedchecked);
  }

  // 如果当前节点有子节点，递归遍历子节点去更新每个子节点的状态
  if (data.children) {
    data.children = data.children.map((child) =>
      traversalAndUpdate(child, selectedValue, isSelectedchecked)
    );

    //当前在data的children层,更新完children层的check状态后
    //现在就是递归返回时，返回到data层, 通过updateParentStatus更新当前节点（也就是子节点的父节点的）状态。
    return modifyParentChecked(data);
  }

  // 返回更新后的数据结构
  return data;
};

/******************************* 递归函数：设置节点及其所有子节点的选中状态 ********************************/
const modifyChecked = (node, isChecked) => {
  node.isChecked = isChecked;
  node.indeterminate = false;

  if (node.children) {
    node.children.forEach((child) => modifyChecked(child, isChecked));
  }
  return node;
};

/*******************************  递归函数：更新父节点的选中状态 ****************************************/
const modifyParentChecked = (node) => {
  if (node.children) {
    const allChecked = node.children.every((child) => child.isChecked);
    const someChecked = node.children.some(
      (child) => child.isChecked || child.indeterminate
    );

    node.isChecked = allChecked;
    node.indeterminate = !allChecked && someChecked;
  }
  return node;
};
