import { sendOrder } from '../api';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_ORDER_ID_LIST = 'SET_ORDER_ID_LIST';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export function postOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });

    sendOrder(ingredients)
      .then(res => dispatch({
        type: POST_ORDER_SUCCESS,
        number: res.order.number
      }))
      .catch(err => dispatch({
        type: POST_ORDER_FAILED
      }));
  }
}