import { TUserActions } from "../actions/user";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TOrderActions } from "../actions/order";
import { TWsFeedActions } from "../actions/feed";
import { TIngredientsAction } from "../actions/ingredients";
import { rootReducer } from "../reducers";

export * from "./data";

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TUserActions
  | TOrderActions
  | TWsFeedActions
  | TIngredientsAction;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  unknown,
  TApplicationActions
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
