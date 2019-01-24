import {
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actions/actionTypes';
import utils from "../../utils";

export function Login(userName) {

    return (dispatch) => {
        if (userName) {
            var data = userName;

            fetch("/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: 'Ошибка авторизации'
                    });
                    throw new Error('Ошибка авторизации');
                }
            }).then((data) => {
                utils.saveAuth(data.username);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data
                });
            }).catch((ex) => {
                alert(ex);                
                dispatch({
                    type: LOGIN_ERROR,
                    payload: ex
                });                
            });
        } else {
            alert('Необходимо ввести имя пользователя');
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Необходимо ввести имя пользователя'
            });
        }
    };
}