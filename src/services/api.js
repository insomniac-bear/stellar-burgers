import { getCookie, setCookie } from '../utils/utils';

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

function refreshTokenRequest () {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then(baseResponseHandler);
};

async function fetchWithRefresh (url, options) {
  try {
    const res = await fetch (url, options);
    const data = await baseResponseHandler(res);
    return data;
  } catch (err) {
//    if (err.message === 'jwt expired') {
    if (!err.success) {
        const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const accessToken = refreshData.accessToken.split('Bearer ')[1];

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('token', accessToken);

      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        }
      });

      const data = await baseResponseHandler(res);
      return data;
    } else {
      return Promise.reject(err);
    }
  }
};

export const ingredientsRequest = () => {
  return fetch(`${config.baseUrl}/ingredients`).then(baseResponseHandler);
};

export const sendOrder = (ingredients) => {
  return fetchWithRefresh(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: {
      ...config.headers,
      authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients })
  });
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

export const logoutRequest = () => {
  return fetchWithRefresh(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
};

export const authUserRequest = () => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    headers: {
      authorization: 'Bearer ' + getCookie('token'),
    }
  });
};

export const updateUserRequest = (userData) => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
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
  });
}
