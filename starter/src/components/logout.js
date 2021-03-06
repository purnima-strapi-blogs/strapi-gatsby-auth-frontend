import React from "react"
import { isUserLoggedIn, getCurrentUser } from '../services/auth';
import { navigate } from "@reach/router"
import { Link } from 'gatsby';
import {useAuth} from '../context/authStore/actions';

const Logout = () => {
    let details;
    const { logoutAction } = useAuth();

    if (!isUserLoggedIn()) {
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