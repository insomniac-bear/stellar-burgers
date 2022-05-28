import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
} from '../actions/ingredients';

const initialState = {
  items: [],
  ingredientsRequest: false,
  ingredientsError: false,
  selectedIngredient: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsError: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        ingredientsRequest: false,
      }
    }
    case RESET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsError: false,
      }
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      }
    }
    case CLEAR_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null,
      }
    }
    default:
      return state
  }
};
