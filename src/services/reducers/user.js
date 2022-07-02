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
  GET_REFRESH_TOKEN_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_UPDATE_USER_FAILED,
  GET_UPDATE_USER_REQUEST,
  GET_UPDATE_USER_SUCCESS,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../actions/user';

const initialState = {
  data: {
    name: '',
    email: '',
    isAuth: false,
  },

  input: {
    name: '',
    email: '',
    password: '',
    code: '',
  },

  message: '',

  authRequest: false,
  authError: false,

  registerRequest: false,
  registerError: false,

  loginRequest: false,
  loginError: false,

  logoutRequest: false,
  logoutError: false,

  forgotPassRequest: false,
  forgotPassError: false,

  resetPassRequest: false,
  resetPassError: false,

  refreshTokenRequest: false,
  refreshTokenError: false,

  updateUserRequest: false,
  updateUserError: false,
}

export const userReducer = (state = initialState, action) => {
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
        registerRequest: true,
      }
    }
    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
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
        registerRequest: false,
        input: {
          ...state.input,
          name: '',
          email: '',
          password: '',
        },
        data: {
          email: action.user.email,
          name: action.user.name,
          isAuth: true,
        },
      }
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      }
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginError: true,
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
        loginRequest: false,
        refreshTokenError: false,
        input: {
          ...state.input,
          email: '',
          password: '',
        },
        data: {
          name: action.user.name,
          email: action.user.email,
          isAuth: true,
        },
      }
    }
    case GET_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
      }
    }
    case GET_AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authError: true,
        message: action.message,
      }
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        data: {
          name: action.user.name,
          email: action.user.email,
          isAuth: true,
        },
      }
    }
    case GET_UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      }
    }
    case GET_UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: true,
        message: action.message,
      }
    }
    case GET_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        data: {
          name: action.user.name,
          email: action.user.email,
          isAuth: true,
        },
      }
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
      }
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenError: true,
        message: action.message,
        data: {
          name: '',
          email: '',
          isAuth: false,
        }
      }
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        authError: false,
        data: {
          ...state.data,
          isAuth: false,
        },
      }
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      }
    }
    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true,
        message: action.message,
      }
    }
    case GET_LOGOUT_SUCCESS: {
      return initialState;
    }
    case GET_FORGOT_PASS_REQUEST: {
      return {
        ...state,
        forgotPassRequest: true,
      }
    }
    case GET_FORGOT_PASS_FAILED: {
      return {
        ...state,
        forgotPassRequest: false,
        forgotPassError: true,
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
        forgotPassRequest: false,
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
        resetPassRequest: true,
      }
    }
    case GET_RESET_PASS_FAILED: {
      return {
        ...state,
        resetPassRequest: false,
        resetPassError: true,
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
        resetPassRequest: false,
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
        authError: false,
        loginError: false,
        registerError: false,
        forgotPassError: false,
        resetPassError: false,
        updateUserError: false,
        message: '',
      }
    }
    default: {
      return state;
    }
  }
}
