export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
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

        // Отправка сообщения
        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    }
  }
}
