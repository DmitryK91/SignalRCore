import axios from "axios";
import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGOUT
} from './userTypes';
import { saveAuth, clearAuth, history } from '../utils';

const baseUrl = "/api/user";

export const Login = (userName) => async (dispatch) => {

    dispatch({ type: LOGIN_PENDING });

    await axios.get(`${baseUrl}/${userName}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        saveAuth(response.data.name, response.data.id);

        history.push('/');

        return dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        }).catch(error => {
            alert(error);
            return dispatch({ type: LOGIN_ERROR, payload: error })
        });
}

export const Logout = () => (dispatch) => {
    clearAuth();
    dispatch({ type: LOGOUT });
    history.push('/login');
}
