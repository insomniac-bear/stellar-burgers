import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { rootReducer } from './reducers';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_GET_FEED
} from './actions/feed';

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders';
const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_GET_FEED,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsFeedUrl, wsFeedActions))
);

export const store = createStore(
  rootReducer,
  enhancer
);
