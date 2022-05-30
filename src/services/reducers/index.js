import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

// const initialState = {
//   activeIngredient: null,

//   price: 0,
//   orderNumber: undefined,
//   orderRequest: false,
//   orderError: false,
//   order: {
//     bun: null,
//     main: [],
//   },
//   errorMessage: undefined,
// }

// const orderReducer = (state = initialState, action) => {};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer
})