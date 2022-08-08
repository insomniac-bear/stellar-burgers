import { RequestStatus } from '../../utils/const';
import { TRequestStatus } from '../../utils/types';
import { TUserActions } from '../actions/user.types';

import {
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_REQUEST,
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
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../actions/user.types';

type TUserState = {
  data: {
    name: string;
    email: string;
  };

  input: {
    name: string;
    email: string;
    password: string;
    code: string;
  };

  isAuth: boolean;
  message: string;

  authRequest: TRequestStatus;
  loginRequest: TRequestStatus;
  logoutRequest: TRequestStatus;
  updateUserRequest: TRequestStatus;

  registerRequest: TRequestStatus;
  forgotPassRequest: TRequestStatus;
  resetPassRequest: TRequestStatus;
}

const initialState: TUserState = {
  data: {
    name: '',
    email: '',
  },

  input: {
    name: '',
    email: '',
    password: '',
    code: '',
  },

  isAuth: false,
  message: '',
  authRequest: 'idle',
  loginRequest: 'idle',
  logoutRequest: 'idle',
  updateUserRequest: 'idle',

  registerRequest: 'idle',
  forgotPassRequest: 'idle',
  resetPassRequest: 'idle',
}

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case USER_FORM_SET_VALUE: {
      return {
        ...state,
       input: {
          ...state.input,
          [action.field]: action.value
        },
      }
    }
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        registerRequest: RequestStatus.pending,
      }
    }
    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequest: RequestStatus.failed,
        input: {
          ...state.input,
          name: '',
          email: '',
          password: '',
        },
       message: action.message,
      }
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerRequest: RequestStatus.success,
        isAuth: true,
        input: {
          ...state.input,
          name: '',
          email: '',
          password: '',
        },
        data: {
          email: action.email,
          name: action.name,
        },
      }
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: RequestStatus.pending,
      }
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: RequestStatus.failed,
        input: {
          ...state.input,
          email: '',
          password: '',
        },
        message: action.message,
      }
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        loginRequest: RequestStatus.success,
        input: {
          ...state.input,
          email: '',
          password: '',
        },
        data: {
          name: action.name,
          email: action.email,
        },
      }
    }
    case GET_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: RequestStatus.pending,
      }
    }
    case GET_AUTH_FAILED: {
      return {
        ...state,
        isAuth: false,
        authRequest: RequestStatus.failed,
      }
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        authRequest: RequestStatus.success,
        message: action.message,
        data: {
          name: action.name,
          email: action.email,
        },
      }
    }
    case GET_UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: RequestStatus.pending,
      }
    }
    case GET_UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: RequestStatus.failed,
        message: action.message,
      }
    }
    case GET_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        updateUserRequest: RequestStatus.success,
        data: {
          name: action.name,
          email: action.email,
        },
      }
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        isAuth: false,
        logoutRequest: RequestStatus.pending,
      }
    }
    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: RequestStatus.failed,
        message: action.message,
      }
    }
    case GET_LOGOUT_SUCCESS: {
      return initialState;
    }
    case GET_FORGOT_PASS_REQUEST: {
      return {
        ...state,
        forgotPassRequest: RequestStatus.pending,
      }
    }
    case GET_FORGOT_PASS_FAILED: {
      return {
        ...state,
        forgotPassRequest: RequestStatus.failed,
        input: {
          ...state.input,
          email: '',
        },
        message: action.message,
      }
    }
    case GET_FORGOT_PASS_SUCCESS: {
      return {
        ...state,
        forgotPassRequest: RequestStatus.success,
        input: {
          ...state.input,
          email: '',
        },
        message: action.message,
      }
    }
    case GET_RESET_PASS_REQUEST: {
      return {
        ...state,
        resetPassRequest: RequestStatus.pending,
      }
    }
    case GET_RESET_PASS_FAILED: {
      return {
        ...state,
        resetPassRequest: RequestStatus.failed,
        input: {
          ...state.input,
          password: '',
          code: '',
        },
        message: action.message,
      }
    }
    case GET_RESET_PASS_SUCCESS: {
      return {
        ...state,
        resetPassRequest: RequestStatus.success,
        input: {
          ...state.input,
          password: '',
          code: '',
        },
        message: action.message,
      }
    }
    case CLEAR_REQUESTS_MESSAGE: {
      return {
        ...state,
        authRequest: RequestStatus.idle,
        loginRequest: RequestStatus.idle,
        logoutRequest: RequestStatus.idle,
        updateUserRequest: RequestStatus.idle,

        registerRequest: RequestStatus.idle,
        forgotPassRequest: RequestStatus.idle,
        resetPassRequest: RequestStatus.idle,
        message: '',
      }
    }
    default: {
      return state;
    }
  }
}
