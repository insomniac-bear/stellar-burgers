export const selectItemsOfType = (itemType, arrayOfItems) => {
  return arrayOfItems.reduce((acc, item) => {
    if (item.type === itemType) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export const correctArr = (arr, prevIndex, newIndex) => {
  const correctedArr = [].concat(arr);
  correctedArr[prevIndex] = arr[newIndex];
  correctedArr[newIndex] = arr[prevIndex];
  return correctedArr;
};

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};