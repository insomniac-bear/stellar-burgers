import { RequestStatus } from '../../utils/const';
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
  TOrderActions,
} from '../actions/order';

type TOrderState = {
  order: {
    bun: IIngredient | null,
    main: IIngredient[] | [],
  },
  orderIngredientsId: string[] | undefined[],
  orderIngredientsIdRequest: TRequestStatus,
  number: number | null,
  price: number,
};

const initialState: TOrderState = {
  order: {
    bun: null,
    main: [],
  },
  orderIngredientsId: [],
  orderIngredientsIdRequest: 'idle',
  number: null,
  price: 0,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
          ? [state.order.bun._id, state.order.main.map(it => it._id), state.order.bun._id]
          : [undefined, state.order.main.map(it => it._id), undefined]
      }
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderIngredientsIdRequest: RequestStatus.pending,
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderIngredientsIdRequest: RequestStatus.failed,
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderIngredientsIdRequest: RequestStatus.success,
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
