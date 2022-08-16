import { RootState } from "../types";

export const getOrders = (store: RootState) => store.feed.orders || undefined;
export const getTotal = (store: RootState) => store.feed.total || 0;
export const getTotalToday = (store: RootState) => store.feed.totalToday || 0;
export const getWsFeedConnected = (state: RootState) =>
  state.feed.wsFeedConnection;
