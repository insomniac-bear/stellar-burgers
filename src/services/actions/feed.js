export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_WITH_TOKEN = 'WS_FEED_CONNECTION_WITH_TOKEN';
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_GET_FEED = 'WS_GET_FEED';

export const wsFeedConnectionWithToken = (token) => {
  return {
    type: WS_FEED_CONNECTION_WITH_TOKEN,
    payload: token,
  };
};

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

export const wsGetFeed = orders => {
  return {
    type: WS_GET_FEED,
    payload: orders,
  };
};
