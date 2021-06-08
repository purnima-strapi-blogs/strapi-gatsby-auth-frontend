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

    return !!user.username && !!user.token
}
export const getCurrentUser = () => isBrowser && getUser().username
export const getCurrentUserToken = () => isBrowser && getUser().token

export const logout = callback => {
    setUser({})
    callback()
}