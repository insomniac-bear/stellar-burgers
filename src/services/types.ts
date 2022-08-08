import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from './store';
import { TUserActions } from './actions/user.types';

export type TRootState = ReturnType<typeof store.getState>

type TApplicationActions = TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
