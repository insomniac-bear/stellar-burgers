export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsInitWithToken, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitWithToken) {
        console.log(payload)
        socket = new WebSocket(`${wsUrl}?token=${payload}`);
      }

        // Закрытие соединения
      if (type === onClose) {
        socket.close();
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

      next(action);
    }
  }
}
