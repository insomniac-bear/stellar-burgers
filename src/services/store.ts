import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { rootReducer } from "./reducers";
import { wsFeedActions } from "./constants";

const wsFeedUrl = "wss://norma.nomoreparties.space/orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsFeedUrl, wsFeedActions))
);

export const store = createStore(rootReducer, enhancer);
