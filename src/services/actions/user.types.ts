export const USER_FORM_SET_VALUE: 'USER_FORM_SET_VALUE' = 'USER_FORM_SET_VALUE';

export const GET_REGISTRATION_REQUEST:'GET_REGISTRATION_REQUEST' = 'GET_REGISTRATION_REQUEST';
export const GET_REGISTRATION_SUCCESS: 'GET_REGISTRATION_SUCCESS' = 'GET_REGISTRATION_SUCCESS';
export const GET_REGISTRATION_FAILED: 'GET_REGISTRATION_FAILED' = 'GET_REGISTRATION_FAILED';

export const GET_LOGIN_REQUEST: 'GET_LOGIN_REQUEST' = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS: 'GET_LOGIN_SUCCESS' = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED: 'GET_LOGIN_FAILED' = 'GET_LOGIN_FAILED';

export const GET_FORGOT_PASS_REQUEST: 'GET_FORGOT_PASS_REQUEST' = 'GET_FORGOT_PASS_REQUEST';
export const GET_FORGOT_PASS_SUCCESS: 'GET_FORGOT_PASS_SUCCESS' = 'GET_FORGOT_PASS_SUCCESS';
export const GET_FORGOT_PASS_FAILED: 'GET_FORGOT_PASS_FAILED' = 'GET_FORGOT_PASS_FAILED';

export const GET_RESET_PASS_REQUEST: 'GET_RESET_PASS_REQUEST' = 'GET_RESET_PASS_REQUEST';
export const GET_RESET_PASS_SUCCESS: 'GET_RESET_PASS_SUCCESS' = 'GET_RESET_PASS_SUCCESS';
export const GET_RESET_PASS_FAILED: 'GET_RESET_PASS_FAILED' = 'GET_RESET_PASS_FAILED';

export const GET_AUTH_REQUEST: 'GET_AUTH_REQUEST' = 'GET_AUTH_REQUEST';
export const GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS' = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED: 'GET_AUTH_FAILED' = 'GET_AUTH_FAILED';

export const GET_LOGOUT_REQUEST: 'GET_LOGOUT_REQUEST' = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS: 'GET_LOGOUT_SUCCESS' = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED:'GET_LOGOUT_FAILED' = 'GET_LOGOUT_FAILED';

export const GET_UPDATE_USER_REQUEST: 'GET_UPDATE_USER_REQUEST' = 'GET_UPDATE_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS: 'GET_UPDATE_USER_SUCCESS' = 'GET_UPDATE_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED: 'GET_UPDATE_USER_FAILED' = 'GET_UPDATE_USER_FAILED';

export const CLEAR_REQUESTS_MESSAGE: 'CLEAR_REQUESTS_MESSAGE' = 'CLEAR_REQUESTS_MESSAGE';

export interface IUserFormAction {
  readonly type: typeof USER_FORM_SET_VALUE;
  [key: string]: string;
}

export interface IGetRegistrationAction {
  readonly type: typeof GET_REGISTRATION_REQUEST;
}

export interface IGetRegistrationSuccessAction {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly email: string;
  readonly name: string;
}

export interface IGetRegistrationFailedAction {
  readonly type: typeof GET_REGISTRATION_FAILED;
  readonly message: string;
}

export interface IGetLoginAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
  readonly message: string;
}

export interface IGetAuthAction {
  readonly type: typeof GET_AUTH_REQUEST;
}

export interface IGetAuthSuccessAction {
  readonly type: typeof GET_AUTH_SUCCESS;
  readonly message: string;
  readonly name: string;
  readonly email: string;
}

export interface IGetAuthFailedAction {
  readonly type: typeof GET_AUTH_FAILED;
}

export interface IGetUpdateUserAction {
  readonly type: typeof GET_UPDATE_USER_REQUEST;
}

export interface IGetUpdateUserSuccessAction {
  readonly type: typeof GET_UPDATE_USER_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IGetUpdateUserFailedAction {
  readonly type: typeof GET_UPDATE_USER_FAILED;
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
