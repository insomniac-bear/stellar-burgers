export const selectItemsOfType = (itemType, arrayOfItems) => {
  return arrayOfItems.reduce((acc, item) => {
    if (item.type === itemType) {
      acc.push(item);
    }
    return acc;
  }, []);
}

export const correctArr = (arr, prevIndex, newIndex) => {
  const correctedArr = [].concat(arr);
  correctedArr[prevIndex] = arr[newIndex];
  correctedArr[newIndex] = arr[prevIndex];
  return correctedArr;
}