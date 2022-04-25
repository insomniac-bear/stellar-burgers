export const selectItemsOfType = (itemType, arrayOfItems) => {
  return arrayOfItems.reduce((acc, item) => {
    if (item.type === itemType) {
      acc.push(item);
    } 
    return acc;
  }, []);
}