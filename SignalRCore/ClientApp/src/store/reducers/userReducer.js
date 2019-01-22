import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SHOW_LOGIN_FORM,
  INPUT_LOGIN
} from '../actions/actionTypes';
import utils from "../../utils";

const initialState = {
    isLogged: utils.isLogged(),
    login: utils.getLogin(),
    error: '',
    isLoginFormShowed: false
};

export const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
        return { ...state,
            isLogged: false,
            name: ''
        };

    case LOGIN_SUCCESS:
        return {
            ...state,
            isLogged: true,
            isLoginFormShowed: false,
            login: action.payload,
            error: ''
        };

    case LOGIN_ERROR:
        return { ...state,
            error: action.payload
        };

    case SHOW_LOGIN_FORM:
        return { ...state,
            isLoginFormShowed: action.payload
        };

    case INPUT_LOGIN:
        return { ...state,
            login: action.payload
        };

    default:
      return state;
  }
}