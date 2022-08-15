import { Middleware, MiddlewareAPI } from 'redux';
import { wsFeedActions } from '../constants';
import { AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsUrl: string, wsActions: typeof wsFeedActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        // Открытие соединения
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        // Ошибка соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        // Получение события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };
        // Закрытие соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

        // Закрытие соединения
        if (type === onClose) {
          socket && socket.close();
        }

      next(action);
    }
  }
}
