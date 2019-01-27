import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const getDateString = dateVal => {
    let date = new Date(dateVal);
    return date.toLocaleDateString() + " at " +
        date.toLocaleTimeString();
}

export const saveAuth = (userName, userID) => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userID", userID);
}

export const clearAuth = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userID");
}

export const getLogin = () => {
    let login = sessionStorage.getItem("userName");
    return login;
}

export const getID = () => {
    let id = sessionStorage.getItem("userID");
    return id;
}

export const isLogged = () => {
    let name = sessionStorage.getItem("userName");
    let id = sessionStorage.getItem("userID");
    if (name && id) {
        return true;
    } else {
        return false;
    }
}
