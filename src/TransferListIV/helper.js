export const DEFAULT_ITEMS_LEFT = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];
export const DEFAULT_ITEMS_RIGHT = ['React', 'Angular', 'Vue', 'Svelte'];

// Convert the default array of items into a map with the item
// name as a key and the value as a boolean.
export const generateItemsMap = (items) => {
  return new Map(items.map((label) => [label, false]));
};

export const countSelectedItems = (items) => {
  return Array.from(items.values()).filter((val) => Boolean(val)).length;
};

// Determine the selected state of the list.
export const determineListSelectionState = (items) => {
  const selectedItems = countSelectedItems(items);
  const totalItems = items.size;

  // Also handles the case where the list is empty.
  if (selectedItems === 0) return 'none';

  if (selectedItems < totalItems) return 'partial';

  return 'all';
};

// Transfer all items from a source list to a destination list.
export const setAllItemsSelectionState = (items, newState) => {
  const newItems = new Map(items);

  Array.from(newItems.keys()).forEach((key) => {
    newItems.set(key, newState);
  });

  return newItems;
};

// Transfer selected items from a source list to a destination list.
export const transferSelectedItems = (
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst
) => {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);

  // Remove selected items from source list and add to the destination list.
  itemsSrc.forEach((value, key) => {
    if (!value) {
      return;
    }

    newItemsDst.set(key, value);
    newItemsSrc.delete(key);
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
};
