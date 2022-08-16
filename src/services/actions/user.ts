import { setCookie } from "../../utils/utils";
import {
  registrationRequest,
  loginRequest,
  forgotPassRequest,
  resetPassRequest,
  authUserRequest,
  logoutRequest,
  updateUserRequest,
} from "../api";
import { AppThunk } from "../types";
import {
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
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
} from "../constants";
import {
  IRegistrationUserData,
  IResetPasswordData,
  IUpdateUserData,
  IUserData,
} from "../../utils/types";

type TUser = {
  name: string;
  email: string;
};

export interface IUserFormAction {
  readonly type: typeof USER_FORM_SET_VALUE;
  [key: string]: string;
}

export interface IGetAuthAction {
  readonly type: typeof GET_AUTH_REQUEST;
}

export interface IGetAuthSuccessAction {
  readonly type: typeof GET_AUTH_SUCCESS;
  readonly message: string;
  readonly user: TUser;
}

export interface IGetAuthFailedAction {
  readonly type: typeof GET_AUTH_FAILED;
}

export interface IGetForgotPassAction {
  readonly type: typeof GET_FORGOT_PASS_REQUEST;
}

export interface IGetForgotPassSuccessAction {
  readonly type: typeof GET_FORGOT_PASS_SUCCESS;
  readonly message: string;
}

export interface IGetForgotPassFailedAction {
  readonly type: typeof GET_FORGOT_PASS_FAILED;
  readonly message: string;
}

export interface IGetLoginAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
  readonly message: string;
}

export interface IGetLogoutAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}

export interface IGetLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED;
  readonly message: string;
}

export interface IGetRegistrationAction {
  readonly type: typeof GET_REGISTRATION_REQUEST;
}

export interface IGetRegistrationSuccessAction {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly user: TUser;
}

export interface IGetRegistrationFailedAction {
  readonly type: typeof GET_REGISTRATION_FAILED;
  readonly message: string;
}

export interface IGetResetPassAction {
  readonly type: typeof GET_RESET_PASS_REQUEST;
}

export interface IGetResetPassSuccessAction {
  readonly type: typeof GET_RESET_PASS_SUCCESS;
  readonly message: string;
}

export interface IGetResetPassFaileAction {
  readonly type: typeof GET_RESET_PASS_FAILED;
  readonly message: string;
}

export interface IGetUpdateUserAction {
  readonly type: typeof GET_UPDATE_USER_REQUEST;
}

export interface IGetUpdateUserSuccessAction {
  readonly type: typeof GET_UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUpdateUserFailedAction {
  readonly type: typeof GET_UPDATE_USER_FAILED;
  readonly message: string;
}

export interface IClearRequestMessageAction {
  readonly type: typeof CLEAR_REQUESTS_MESSAGE;
}

export type TUserActions =
  | IUserFormAction
  | IGetAuthAction
  | IGetAuthFailedAction
  | IGetAuthSuccessAction
  | IGetForgotPassAction
  | IGetForgotPassFailedAction
  | IGetForgotPassSuccessAction
  | IGetLoginAction
  | IGetLoginFailedAction
  | IGetLoginSuccessAction
  | IGetLogoutAction
  | IGetLogoutFailedAction
  | IGetLogoutSuccessAction
  | IGetRegistrationAction
  | IGetRegistrationFailedAction
  | IGetRegistrationSuccessAction
  | IGetResetPassAction
  | IGetResetPassFaileAction
  | IGetResetPassSuccessAction
  | IGetUpdateUserAction
  | IGetUpdateUserFailedAction
  | IGetUpdateUserSuccessAction
  | IClearRequestMessageAction;

export const registerUser = (newUser: IRegistrationUserData): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    });

    registrationRequest(newUser)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: GET_REGISTRATION_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_REGISTRATION_FAILED,
          message: err.message,
        });
      });
  };
};

export const loginUser = (authData: IUserData): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });

    loginRequest(authData)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LOGIN_FAILED,
          message: err.message,
        });
      });
  };
};

export const recoveryPassword = (email: string): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_FORGOT_PASS_REQUEST,
    });

    forgotPassRequest(email)
      .then((res) => {
        dispatch({
          type: GET_FORGOT_PASS_SUCCESS,
          message: res.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_FORGOT_PASS_FAILED,
          message: err.message,
        });
      });
  };
};

export const resetPassword = ({
  password,
  token,
}: IResetPasswordData): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASS_REQUEST,
    });

    resetPassRequest({ password, token })
      .then((res) => {
        dispatch({
          type: GET_RESET_PASS_SUCCESS,
          message: res.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_RESET_PASS_FAILED,
          message: err.message,
        });
      });
  };
};

export const authUser = (): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    authUserRequest()
      .then((res) => {
        dispatch({
          type: GET_AUTH_SUCCESS,
          user: res.user,
          message: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
};

export const logoutUser = (): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });

    logoutRequest()
      .then(() => {
        dispatch({
          type: GET_LOGOUT_SUCCESS,
        });
        setCookie("token", "");
        localStorage.clear();
      })
      .catch((err) => {
        dispatch({
          type: GET_LOGOUT_FAILED,
          message: err.message,
        });
      });
  };
};

export const updateUser = (userData: IUpdateUserData): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_UPDATE_USER_REQUEST,
    });

    updateUserRequest(userData)
      .then((res) => {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_UPDATE_USER_FAILED,
          message: err.message,
        });
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
};
