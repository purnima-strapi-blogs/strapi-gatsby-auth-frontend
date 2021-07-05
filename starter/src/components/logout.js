import React from "react"
import { isLoggedIn, getCurrentUser } from '../services/auth';
import { Link, navigate } from "@reach/router"
import {useAuth} from '../context/authStore/actions';

const Logout = () => {
    let details;
    const { logoutAction } = useAuth();

    if (!isLoggedIn()) {
        details = (
            <div >
                To get the full app experience, you’ll need to
                {` `}
                <Link to="/app/login"> log in</Link>.
            </div>
        )
    } else {
        const {username, email} = getCurrentUser()
        details = (
            <div>
                Welcome {username}, email is ({email})
                {` `}
                <a
                    href="/"
                    onClick={event => {
                        event.preventDefault()
                        logoutAction(() => navigate(`/app/login`))
                    }}
                >
                    log out
            </a>
            </div>
        )
    }
    return (
        <div>
            {details}
        </div>
    )
}

export default Logout;