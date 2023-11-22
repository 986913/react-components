export const DEFAULT_ITEMS_LEFT = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];
export const DEFAULT_ITEMS_RIGHT = ['React', 'Angular', 'Vue', 'Svelte'];

/* Convert the default array of items into a map with the item name as a key and the value as a boolean:
    {
      "HTML" => false,
      "JavaScript" => false,
      "CSS" => false,
      "TypeScript" => false
    }
    {
      "React" => false,
      "Angular" => false,
      "Vue" => false,
      "Svelte" => false
    }
 */
export const generateItemsMap = (items) =>
  new Map(items.map((label) => [label, false]));

// Determine if the list has no selected items.
export const hasNoSelectedItems = (items) =>
  Array.from(items.values()).filter((val) => Boolean(val)).length === 0;

// Transfer all items from a source list to a destination list.
export const transferAllItems = (
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst
) => {
  setItemsDst(new Map([...itemsDst, ...itemsSrc]));
  setItemsSrc(new Map());
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
    // if value is false, means no-selected, then return function directly
    if (!value) return;

    // if value is true, means selected, then remove selected items from source list and add to the destination list.
    newItemsDst.set(key, value);
    newItemsSrc.delete(key);
  });

  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
};
