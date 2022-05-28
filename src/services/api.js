import { OrderActionTypes } from '../utils/const';

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

function baseResponseHandler (res) {
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};

export const getingredients = (ingredients, setingredients) => {
  setingredients({ ...ingredients, hasError: false, isLoading: true });

  fetch(`${config.baseUrl}/ingredients`)
    .then(baseResponseHandler)
    .then(res => setingredients({ ...ingredients, ingredientsData: res.data, isLoading: false }))
    .catch(err => {
      setingredients({ ...ingredients, isLoading: false, hasError: true, errorMessage: err.message })
    });
};

export const ingredientsRequest = () => {
  return fetch(`${config.baseUrl}/ingredients`).then(baseResponseHandler)
}

export const sendOrder = (ingredients, setOrder) => {
  setOrder({ type: OrderActionTypes.SET_LOADING, payload: true });
  fetch(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      ingredients
    })
  })
  .then(baseResponseHandler)
  .then(res => setOrder({ type: OrderActionTypes.SET_ORDER, payload: res.order.number}))
  .catch(err => setOrder({ type: OrderActionTypes.SET_ERROR, payload: err }))
  .finally(() => setOrder({ type: OrderActionTypes.SET_LOADING, payload: false }));
}