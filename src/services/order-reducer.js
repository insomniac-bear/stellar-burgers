import { OrderActionTypes } from '../utils/const';

export const orderReducer = (state, action) => {
  switch (action.type) {
    case OrderActionTypes.ADD:
      return action.payload.type === 'bun' ?
      {
        ...state,
        bun: action.payload,
        ingredients: [].concat(action.payload._id, state.ingredients.slice(1)),
        price: state.bun ?
          state.price - state.bun.price * 2 + action.payload.price * 2 :
          state.price + action.payload.price * 2,
      } :
      {
        ...state,
        main: [...state.main, action.payload],
        ingredients: [...state.ingredients, action.payload._id],
        price: state.price + action.payload.price,
      }
    case OrderActionTypes.DEL:
      const ingredientIndex = state.ingredients.indexOf(action.payload.item._id);
      return {
        ...state,
        main: [].concat(state.main.slice(0, action.payload.index), state.main.slice(action.payload.index + 1, state.main.length)),
        ingredients: [].concat(state.ingredients.slice(0, ingredientIndex), state.ingredients.slice(ingredientIndex + 1, state.ingredients.length)),
        price: state.price - action.payload.item.price,
      }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}
