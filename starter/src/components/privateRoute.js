import React from "react"
import { navigate } from "gatsby"
import { isUserLoggedIn, getUser } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    console.log("isUserLoggedIn", isUserLoggedIn())
    if (!isUserLoggedIn() && location.pathname !== `/app/login`) {
        navigate("/app/login")
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute