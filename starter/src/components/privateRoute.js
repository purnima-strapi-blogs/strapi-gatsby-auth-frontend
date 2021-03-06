import React from "react"
import { navigate } from "gatsby"
import { isUserLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isUserLoggedIn() && location.pathname !== `/app/login`) {
        navigate("/app/login")
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute