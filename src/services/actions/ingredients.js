import { ingredientsRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const RESET_INGREDIENTS_FAILED = 'RESET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    ingredientsRequest()
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      });
  }
};
