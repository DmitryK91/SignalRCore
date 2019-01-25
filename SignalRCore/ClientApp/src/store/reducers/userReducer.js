import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING
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
            isPending: false,
            error: ''
        };

    case LOGIN_ERROR:
        return { ...state,
            error: action.payload
        };

    case LOGIN_PENDING:
        return { ...state,
            isPending: true
        };

    default:
      return state;
  }
}