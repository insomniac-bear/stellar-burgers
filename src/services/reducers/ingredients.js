import { RequestStatus } from '../../utils/const';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

const initialState = {
  items: [],
  ingredientsRequest: RequestStatus.idle,
};

export const ingredientsReducer = (state = initialState, action) => {
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
