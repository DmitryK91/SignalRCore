export default {

  getDateString: dateVal => {
    let date = new Date(dateVal);
    return date.toLocaleDateString() + " at " +
      date.toLocaleTimeString();
  },

  saveAuth: (userName) => {
    sessionStorage.setItem("userName", userName);
  },

  clearAuth: () => {
    sessionStorage.removeItem("userName");
  },

  getLogin: () => {
    let login = sessionStorage.getItem("userName");
    return login;
  },

  isLogged: () => {
    let item = sessionStorage.getItem("userName");
    if (item) {
      return true;
    } else {
      return false;
    }
  },

}