import React from "react"
import { logout, isLoggedIn, getCurrentUser } from '../services/auth';
import { Link, navigate } from "@reach/router"
import useAuth from '../context/actions';

const Logout = () => {
    let details;
    const { logoutAction } = useAuth();
    if (!isLoggedIn()) {
        details = (
            <p >
                To get the full app experience, you’ll need to
                {` `}
                <Link to="/app/login"> log in</Link>.
            </p>
        )
    } else {
        const { username, email } = getCurrentUser()

        details = (
            <p >
                Logged in as {username} ({email}
            )!
                {` `}
                <a
                    href="/"
                    onClick={event => {
                        event.preventDefault()
                        //logout(() => navigate(`/app/login`))
                        logoutAction(() => navigate(`/app/login`))
                    }}
                >
                    log out
            </a>
            </p>
        )
    }
    // const handleLogout = (event) => {
    //     logout(() => navigate(`/app/login`))
    // }

    return (
        // <button onClick={handleLogout}>
        //     Logout
        // </button>
        <div>
            {details}
        </div>
    )
}

export default Logout;