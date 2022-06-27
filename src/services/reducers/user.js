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

  registerRequest: false,
  registerError: false,

  authRequest: false,
  authError: false,

  forgotPassRequest: false,
  forgotPassError: false,

  resetPassRequest: false,
  resetPassError: false,
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
        authRequest: true,
      }
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authError: true,
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
        authRequest: false,
        accessToken: action.accessToken,
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
        registerError: false,
        forgotPassError: false,
        resetPassError: false,
        message: '',
      }
    }
    default: {
      return state;
    }
  }
}
