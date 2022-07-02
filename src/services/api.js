import { getCookie } from '../utils/utils';

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

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

export const refreshTokenRequest = (refreshToken) => {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: refreshToken
    })
  }).then(baseResponseHandler);
};

export const logoutRequest = (refreshToken) => {
  return fetch(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: refreshToken
    })
  }).then(baseResponseHandler);
};

export const authUserRequest = () => {
  return fetch(`${config.baseUrl}/auth/user`, {
    headers: {
      authorization: 'Bearer ' + getCookie('token'),
    }
  }).then(baseResponseHandler);
};

export const updateUserRequest = (userData) => {
  return fetch(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      name: userData?.name,
      email: userData?.email,
      password: userData?.password
    }),
  }).then(baseResponseHandler);
}
