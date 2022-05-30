const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

function baseResponseHandler (res) {
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};

export const ingredientsRequest = () => {
  return fetch(`${config.baseUrl}/ingredients`).then(baseResponseHandler)
}

export const sendOrder = (ingredients) => {
  return fetch(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ ingredients })
  }).then(baseResponseHandler)
}
