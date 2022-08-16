import { IIngredient, TRequestStatus } from "../../utils/types";
import { TIngredientsAction } from "../actions/ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
} from "../constants";

export type TIngredientsState = {
  items: IIngredient[] | [];
  ingredientsRequest: TRequestStatus;
};

const initialState: TIngredientsState = {
  items: [],
  ingredientsRequest: "idle",
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsAction
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: "pending",
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: "pending",
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        ingredientsRequest: "success",
      };
    }
    case RESET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: "idle",
      };
    }
    default:
      return state;
  }
};
