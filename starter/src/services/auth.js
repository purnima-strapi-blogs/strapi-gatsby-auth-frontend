export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {};

export const setUser = (user) =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

/* 
    I'll have to see if the httpOnly cookie has been set, if yes, user is successfully logged in 
    if not, then redirect to login page again. Check this later.
 
 */
export const isUserLoggedIn = () => {
  const user = getUser();
  if (user && user.user && user.user.username) {
    return true;
  }

  return false;
};

export const getCurrentUser = () => getUser().user;

// export const getCurrentUserToken = () => getUser().token

export const clearLocalStorage = (callback) => {
  setUser({});
  callback();
};
