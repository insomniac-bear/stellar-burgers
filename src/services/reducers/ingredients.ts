import { RequestStatus } from '../../utils/const';
import { IIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
  TIngredientsAction,
} from '../actions/ingredients';

type TIngredientsState = {
  items: [] | IIngredient[],
  ingredientsRequest: string,
}

const initialState: TIngredientsState = {
  items: [],
  ingredientsRequest: RequestStatus.idle,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: RequestStatus.pending,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: RequestStatus.failed,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        ingredientsRequest: RequestStatus.success,
      }
    }
    case RESET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: RequestStatus.idle,
      }
    }
    default:
      return state
  }
};
