import { BASE_URL } from './const';

export const selectItemsOfType = (itemType, arrayOfItems) => {
  return arrayOfItems.reduce((acc, item) => {
    if (item.type === itemType) {
      acc.push(item);
    }
    return acc;
  }, []);
}

export const fetchData = (url) => {
  return fetch(url)
    .then(res => res.ok ?
      res.json() :
      res.json()
        .then(err => Promise.reject(err))
  );
};

export const getingredients = (ingredients, setingredients) => {
  setingredients({ ...ingredients, hasError: false, isLoading: true });
  fetchData(BASE_URL)
    .then(res => setingredients({ ...ingredients, ingredientsData: res.data, isLoading: false }))
    .catch(err => {
      setingredients({ ...ingredients, isLoading: false, hasError: true, errorMessage: err.message })
    });
};