import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  INPUT_LOGIN
} from '../actions/actionTypes';
import utils from "../../utils";

const initialState = {
    isLogged: utils.isLogged(),
    login: utils.getLogin(),
    error: ''
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
            login: action.payload,
            error: ''
        };

    case LOGIN_ERROR:
        return { ...state,
            error: action.payload
        };

    case INPUT_LOGIN:
        return { ...state,
            login: action.payload
        };

    default:
      return state;
  }
}