import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_PENDING
} from '../actions/actionTypes';

const baseUrl = "/api/user";

export const Login = (userName) => (dispatch) => {

    if (userName) {
        dispatch({ type: LOGIN_PENDING });

        axios.get(`${baseUrl}/${userName}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => dispatch({ type: LOGIN_SUCCESS, payload: response.data }))
            .catch(error =>
                dispatch({ type: LOGIN_ERROR, payload: error })
            );
    }
    else{
        Login(window.prompt('Your name:', 'John'))
    }
}