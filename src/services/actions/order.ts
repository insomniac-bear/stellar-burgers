import { IIngredient } from "../../utils/types";
import { sendOrder } from "../api";
import { AppThunk } from "../types";
import {
  GET_AUTH_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_ORDER_ID_LIST,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  CLEAR_ORDER,
  SORT_ORDER,
} from "../constants";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly index: number;
}

export interface ISetOrderIdListAction {
  readonly type: typeof SET_ORDER_ID_LIST;
}

export interface IPostOrderAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly number: number;
}

export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export interface ISortOrderAction {
  readonly type: typeof SORT_ORDER;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}

export type TOrderActions =
  | IAddIngredientAction
  | IClearOrderAction
  | IPostOrderAction
  | IPostOrderFailedAction
  | IPostOrderSuccessAction
  | IRemoveIngredientAction
  | ISetOrderIdListAction
  | ISortOrderAction;

export function postOrder(ingredients: string[]): AppThunk {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });

    sendOrder(ingredients)
      .then((res) =>
        dispatch({
          type: POST_ORDER_SUCCESS,
          number: res.order.number,
        })
      )
      .catch(() => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
}
