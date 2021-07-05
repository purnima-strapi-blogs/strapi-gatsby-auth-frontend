export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
        : {}

export const setUser = user => (
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
)

export const isLoggedIn = () => {
    const user = getUser()
    return !!user.token && !!user.user.username
}


export const getCurrentUser = () =>  getUser().user
export const getCurrentUserToken = () => getUser().token

export const logout = callback => {
    setUser({})
    callback()
}