import {
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_PENDING
} from './userTypes';
import { getLogin, isLogged, getID } from "../utils";

const initialState = {
    isLogged: isLogged(),
    userName: getLogin(),
    userID: getID(),
    error: '',
    isPending: false
};

export const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                isLogged: false,
                userName: '',
                userID: '',
                name: ''
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                userName: action.payload.name,
                userID: action.payload.id,
                isPending: false,
                error: ''
            };

        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case LOGIN_PENDING:
            return {
                ...state,
                isPending: true
            };

        default:
            return state;
    }
}