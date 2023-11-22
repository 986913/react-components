export const DEFAULT_LEFT_ITEMS = ['Html', 'Css', 'Javascript'];
export const DEFAULT_RIGHT_ITEMS = ['Vue', 'React', 'Vanilla'];

/**
 *
 * @param {*} itemsArr 输入为字符串数组 ['html','css']
 * @returns 输出为Map结构,比如{"html" => false, "css"=> false}
 */
export const generateItemsMap = (itemsArr) => {
  const entries = itemsArr.map((item) => [item, false]);
  return new Map(entries);
};

/**
 *
 * @param {*} srcItems 从哪儿开始移
 * @param {*} desItems 移到哪儿
 * @param {*} updateSrcItemsFn 父组件的hook,更新items的，比如setLeftItems, setRightItems
 * @param {*} updateDesItemsFn 父组件的hook,更新items的，比如setLeftItems, setRightItems
 */
export const moveAllItems = (
  srcItems,
  desItems,
  updateSrcItemsFn,
  updateDesItemsFn
) => {
  /* 
    desItems and srcItems 长得是这样:                  Map {"vue"=>false, "react"=>true}
    then [...desItems] and [...srcItems] 长得是这样:  [['vue', false], ['react', true]]
  */
  updateDesItemsFn(new Map([...desItems, ...srcItems]));
  updateSrcItemsFn(new Map());
};

/**
 *
 * @param {*} srcItems 从哪儿开始移
 * @param {*} desItems 移到哪儿
 * @param {*} updateSrcItemsFn 父组件的hook,更新items的，比如setLeftItems, setRightItems
 * @param {*} updateDesItemsFn 父组件的hook,更新items的，比如setLeftItems, setRightItems
 */
export const moveSelectedItems = (
  srcItems,
  desItems,
  updateSrcItemsFn,
  updateDesItemsFn
) => {
  const newSrcItems = new Map(srcItems);
  const newDstItems = new Map(desItems);

  //注意循环的是orignal srcItems map:s
  srcItems.forEach((val, key) => {
    // if value is false, means no-selected, then return function directly
    if (val === false) return;

    // if value is true, means selected, then remove selected items from source list and add to the destination list.
    newDstItems.set(key, val);
    newSrcItems.delete(key);
  });

  updateSrcItemsFn(newSrcItems);
  updateDesItemsFn(newDstItems);
};

/**
 * Determine if the list has no selected items.
 * @param {*} items
 * @returns {boolean}
 */
export const hasNoSelectedItems = (items) => {
  const values = Array.from(items.values());
  for (let i = 0; i < values.length; i++) {
    if (values[i] === true) return false;
  }
  return true;
};
