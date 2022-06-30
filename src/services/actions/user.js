import { setCookie } from '../../utils/utils';
import {
  registrationRequest,
  loginRequest,
  forgotPassRequest,
  resetPassRequest,
  authUserRequest,
  refreshTokenRequest,
} from '../api';

export const USER_FORM_SET_VALUE = 'USER_FORM_SET_VALUE';

export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST';
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const GET_FORGOT_PASS_REQUEST = 'GET_FORGOT_PASS_REQUEST';
export const GET_FORGOT_PASS_SUCCESS = 'GET_FORGOT_PASS_SUCCESS';
export const GET_FORGOT_PASS_FAILED = 'GET_FORGOT_PASS_FAILED';

export const GET_RESET_PASS_REQUEST = 'GET_RESET_PASS_REQUEST';
export const GET_RESET_PASS_SUCCESS = 'GET_RESET_PASS_SUCCESS';
export const GET_RESET_PASS_FAILED = 'GET_RESET_PASS_FAILED';

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const CLEAR_REQUESTS_MESSAGE = 'CLEAR_REQUESTS_MESSAGE';

export function registerUser(newUser) {
  return function(dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    });

    registrationRequest(newUser)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then(res => {
        dispatch({
          type: GET_REGISTRATION_SUCCESS,
          user: res.user,
        })
      })
      .catch(err => {
        dispatch({
          type: GET_REGISTRATION_FAILED,
          message: err.message
        });
      });
  }
};

export function loginUser(authData) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });

    loginRequest(authData)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then(res => {
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_LOGIN_FAILED,
          message: err.message,
        });
      });
  }
};

export function recoveryPassword(email) {
  return function (dispatch) {
    dispatch({
      type: GET_FORGOT_PASS_REQUEST,
    });

    forgotPassRequest(email)
      .then(res => {
        dispatch({
          type: GET_FORGOT_PASS_SUCCESS,
          message: res.message,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_FORGOT_PASS_FAILED,
          message: err.message,
        });
      });
  }
};

export function resetPassword({ password, token }) {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASS_REQUEST,
    });

    resetPassRequest({ password, token })
      .then(res => {
        dispatch({
          type: GET_RESET_PASS_SUCCESS,
          message: res.message,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_RESET_PASS_FAILED,
          message: err.message,
        });
      });
  }
};

export function authUser() {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    authUserRequest()
      .then(res => {
        dispatch({
          type: GET_AUTH_SUCCESS,
          user: res.user,
        })
      })
      .catch(err => {
        dispatch({
          type: GET_AUTH_FAILED,
          message: err.message,
        });
      });
   }
};

export function updateRefreshToken() {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST,
    });
    const refreshToken = localStorage.getItem('refreshToken');

    refreshTokenRequest(refreshToken)
      .then(res => {
        dispatch({
          type: GET_REFRESH_TOKEN_SUCCESS,
        });
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        localStorage.clear();
        setCookie('token', '');
        dispatch({
          type: GET_REFRESH_TOKEN_FAILED,
          message: err.message
        });
      });
  }
};
