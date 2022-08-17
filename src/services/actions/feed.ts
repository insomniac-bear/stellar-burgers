import { IIngredient, IOrder } from "../../utils/types";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_GET_FEED,
  WS_FEED_CONNECTION_START,
} from "../constants";

export const wsFeedConnectionSuccess = () => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS,
  };
};

export const wsFeedConnectionError = () => {
  return {
    type: WS_FEED_CONNECTION_ERROR,
  };
};

export const wsFeedConnectionClosed = () => {
  return {
    type: WS_FEED_CONNECTION_CLOSED,
  };
};

export const wsGetFeed = (orders: IIngredient[]) => {
  return {
    type: WS_GET_FEED,
    payload: orders,
  };
};

export interface IWsFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
  readonly payload: string;
}

export interface IWsFeedConnectionAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IWsFeedConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsGetFeed {
  readonly type: typeof WS_GET_FEED;
  readonly payload: {
    readonly orders: IOrder[];
    readonly total: number;
    readonly totalToday: number;
  };
}

export type TWsFeedActions =
  | IWsFeedConnectionStart
  | IWsFeedConnectionAction
  | IWsFeedConnectionClosedAction
  | IWsFeedConnectionErrorAction
  | IWsGetFeed;
