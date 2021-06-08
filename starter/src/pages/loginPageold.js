import React from "react"
import { Link } from "gatsby"
import Login from '../components/login'
import Layout from "../components/layout"

const LoginPage = ({ location }) => {
    const { state: routeState } = location
    const redirect = !routeState
        ? '/app'
        : routeState.redirect === 'app'
            ? '/app'
            : `/app/${routeState.redirect}`

    return (
        <Layout>
            <div className="uk-section">
                <div className="uk-container">
                    <h1>Login</h1>
                    <p>Please use your credentials to login</p>
                    <Link to="/signup"><p>Click here to signup here</p></Link>
                    <div>
                        <Login redirect={redirect} />
                    </div>
                    <Link to="/app/profile">Go to Home Page</Link>
                </div>
            </div>
        </Layout>
    )
}

export default LoginPage