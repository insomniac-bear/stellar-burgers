import { IIngredient } from '../../utils/types';
import { ingredientsRequest } from '../api';
import { AppDispatch } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const RESET_INGREDIENTS_FAILED: 'RESET_INGREDIENTS_FAILED' = 'RESET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function (dispatch: AppDispatch) {
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

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST,
};

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly items: IIngredient[],
};

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED,
};

export interface IResetIngredientsFailedAction {
  readonly type: typeof RESET_INGREDIENTS_FAILED,
};

export type TIngredientsAction =
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction
  | IResetIngredientsFailedAction;
