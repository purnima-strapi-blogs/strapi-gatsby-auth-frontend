import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, getUser } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    console.log("isLoggedIn", isLoggedIn())
    if (!isLoggedIn() && location.pathname !== `/app/login`) {
        navigate("/app/login")
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute