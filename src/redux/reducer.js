
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./type";


const initialLoginState = {
  loading: false,
  token: localStorage.getItem("token") || null,
  userType: localStorage.getItem("userType") || null,
  corpId: localStorage.getItem("corpId") || null,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userType: action.payload.userType,
        corpId: action.payload.corpId || null,
        error: null,
        isAuthenticated: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGOUT:
      return {
        ...initialState,
        token: null,
        userType: null,
        corpId: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

