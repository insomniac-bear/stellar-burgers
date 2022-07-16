import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_GET_FEED,
  WS_FEED_CONNECTION_SUCCESS,
} from '../actions/feed';

const initialState = {
  wsFeedConnection: false,
  wsFeedError: false,
  orders: [],
  total: 0,
  totalToday: 0,
}

export const wsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsFeedConnection: true,
        wsFeedError: false,
      };
    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsFeedConnection: false,
        wsFeedError: true,
      };
    case WS_FEED_CONNECTION_CLOSED:
      return {
        wsFeedConnection: false,
        wsFeedError: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    case WS_GET_FEED:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
