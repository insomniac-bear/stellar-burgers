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
  return fetch(`${config.baseUrl}/ingredients`).then(baseResponseHandler);
};

export const sendOrder = (ingredients) => {
  return fetch(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ ingredients })
  }).then(baseResponseHandler);
};

export const registrationRequest = (user) => {
  return fetch(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(user)
  }).then(baseResponseHandler);
};

export const loginRequest = (authData) => {
  return fetch(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(authData)
  }).then(baseResponseHandler);
};

export const forgotPassRequest = (email) => {
  return fetch(`${config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(email)
  }).then(baseResponseHandler);
};

export const resetPassRequest = ({password, token}) => {
  return fetch(`${config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      password,
      token
    })
  }).then(baseResponseHandler);
};
