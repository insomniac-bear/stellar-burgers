import {
  IUserData,
  IUpdateUserData,
  IResetPasswordData,
} from '../utils/types';
import {
  IAuthResponse,
  IInformationResponse,
  IIngredientsRequest,
  IRefreshResponse,
  ISendOrderResponse,
  IUpdateUserResponse,
} from './types'
import { getCookie, setCookie } from '../utils/utils';

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

const baseResponseHandler = <T> (res: Response): Promise<T> => {
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};


function refreshTokenRequest (): Promise<IRefreshResponse> {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => baseResponseHandler<IRefreshResponse>(res));
};

async function fetchWithRefresh<T> (url: string, options: any): Promise<T> {
  try {
    const res = await fetch (url, options);

    return await baseResponseHandler<T>(res);
  } catch (err: any) {
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

      return await baseResponseHandler<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const ingredientsRequest = () => {
  return fetch(`${config.baseUrl}/ingredients`).then((res) => baseResponseHandler<IIngredientsRequest>(res));
};

export const sendOrder = (ingredients: string[]) => {
  return fetchWithRefresh<ISendOrderResponse>(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: {
      ...config.headers,
      authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients })
  });
};

export const registrationRequest = (user: IUserData & { name: string }) => {
  return fetch(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(user)
  }).then((res) => baseResponseHandler<IAuthResponse>(res));
};

export const loginRequest = (authData: IUserData) => {
  return fetch(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(authData)
  }).then((res) => baseResponseHandler<IAuthResponse>(res));
};

export const forgotPassRequest = (email: string) => {
  return fetch(`${config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(email)
  }).then((res) => baseResponseHandler<IInformationResponse>(res));
};

export const resetPassRequest = ({password, token}: IResetPasswordData) => {
  return fetch(`${config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      password,
      token
    })
  }).then((res) => baseResponseHandler<IInformationResponse>(res));
};

export const logoutRequest = () => {
  return fetchWithRefresh<IInformationResponse>(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
};

export const authUserRequest = () => {
  return fetchWithRefresh<IAuthResponse>(`${config.baseUrl}/auth/user`, {
    headers: {
      authorization: 'Bearer ' + getCookie('token'),
    }
  });
};

export const updateUserRequest = (userData: IUpdateUserData) => {
  return fetchWithRefresh<IUpdateUserResponse>(`${config.baseUrl}/auth/user`, {
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
