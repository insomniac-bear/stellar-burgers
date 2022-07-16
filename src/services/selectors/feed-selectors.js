export const getOrders = store => store.feed.orders || undefined;
export const getTotal = store => store.feed.total || 0;
export const getTotalToday = store => store.feed.totalToday || 0;
export const getWsFeedConnected = state => state.feed.wsFeedConnection;
