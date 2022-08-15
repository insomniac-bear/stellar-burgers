import { IIngredient, TRequestStatus } from '../../utils/types';
import { correctArr } from '../../utils/utils';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_ORDER_ID_LIST,
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  CLEAR_ORDER,
  SORT_ORDER,
} from '../constants';

import { TOrderActions } from '../actions/order';

interface IOrder {
  bun: IIngredient | null;
  main: IIngredient[];
};

type TOrderState = {
  order: IOrder;
  orderIngredientsId: string[];
  orderIngredientsIdRequest: TRequestStatus;
  number: number | null;
  price: number;
};

const initialState: TOrderState = {
  order: {
    bun: null,
    main: [],
  },
  orderIngredientsId: [],
  orderIngredientsIdRequest: 'idle',
  number: 0,
  price: 0,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        order: action.ingredient.type === 'bun'
          ? {
              ...state.order,
              bun: action.ingredient
            }
          : {
            ...state.order,
            main: [ ...state.order.main, action.ingredient ]
          },
        price: action.ingredient.type === 'bun' && state.order.bun
          ? state.price - state.order.bun.price * 2 + action.ingredient.price * 2
          : action.ingredient.type === 'bun'
          ? state.price + action.ingredient.price * 2
          : state.price + action.ingredient.price,
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        order: {
          ...state.order,
          main: state.order.main.filter(item => item !== state.order.main[action.index])
        },
        price: state.price - state.order.main[action.index].price,
      }
    }
    case SET_ORDER_ID_LIST: {
      return {
        ...state,
        orderIngredientsId: state.order.bun
          ? [state.order.bun._id, ...state.order.main.map(it => it._id), state.order.bun._id]
          : [...state.order.main.map(it => it._id)]
      }
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderIngredientsIdRequest: 'pending',
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderIngredientsIdRequest: 'failed',
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderIngredientsIdRequest: 'success',
        number: action.number
      }
    }
    case CLEAR_ORDER: {
      return initialState
    }
    case SORT_ORDER: {
      return {
        ...state,
        order: {
          ...state.order,
          main: correctArr(state.order.main, action.hoverIndex, action.dragIndex),
        }
      }
    }
    default:
      return state
  }
}
