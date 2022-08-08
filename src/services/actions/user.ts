import { setCookie } from '../../utils/utils';
import {
  registrationRequest,
  loginRequest,
  forgotPassRequest,
  resetPassRequest,
  authUserRequest,
  logoutRequest,
  updateUserRequest,
} from '../api';
import { AppDispatch, AppThunk } from '../types';
import {
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,

  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,

  GET_FORGOT_PASS_FAILED,
  GET_FORGOT_PASS_REQUEST,
  GET_FORGOT_PASS_SUCCESS,

  GET_RESET_PASS_FAILED,
  GET_RESET_PASS_REQUEST,
  GET_RESET_PASS_SUCCESS,

  GET_AUTH_FAILED,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,

  GET_LOGOUT_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,

  GET_UPDATE_USER_FAILED,
  GET_UPDATE_USER_REQUEST,
  GET_UPDATE_USER_SUCCESS,
} from './user.types';

export interface IRegistrationUserActions {
  readonly type: typeof GET_REGISTRATION_REQUEST
}

export const registerUser: AppThunk = (newUser: {name: string, email: string, password: string}) => {
  return function(dispatch: AppDispatch) {
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

export const loginUser: AppThunk = (authData) => {
  return function (dispatch: AppDispatch) {
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

export const recoveryPassword: AppThunk = (email) => {
  return function (dispatch: AppDispatch) {
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

export const resetPassword: AppThunk = ({ password, token }) => {
  return function (dispatch: AppDispatch) {
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

export const authUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    authUserRequest()
      .then(res => {
        dispatch({
          type: GET_AUTH_SUCCESS,
          user: res.user,
          message: res.success,
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
   }
};

export const logoutUser: AppThunk =() => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });

    logoutRequest()
      .then(() => {
        dispatch({
          type: GET_LOGOUT_SUCCESS,
        });
        setCookie('token', '');
        localStorage.clear();
      })
      .catch(err => {
        dispatch({
          type: GET_LOGOUT_FAILED,
          message: err.message,
        });
      });
  }
};

export const updateUser: AppThunk = (userData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_UPDATE_USER_REQUEST,
    });

    updateUserRequest(userData)
      .then(res => {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_UPDATE_USER_FAILED,
          message: err.message,
        });
        dispatch({
          type: GET_AUTH_FAILED,
        })
      });
  }
}
