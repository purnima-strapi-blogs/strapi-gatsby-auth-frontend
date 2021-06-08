import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Signup from "../components/signup"

const RegisterPage = ({ location }) => {
  const { state: routeState } = location
//   const redirect = !routeState
//     ? '/app'
//     : routeState.redirect === 'app'
//       ? '/app'
//       : `/app/${routeState.redirect}`
  
  return (
    <Layout>
        <div className="uk-section">
            <div className="uk-container">
                <h1>Sign Up</h1>
                <p>Register here</p>
                <Link to="/login"><p>Click here to login instead</p></Link>
                <div>
                    {/* <Signup  /> */}
                </div>
                {/* <Link to="/">Go to Home Page</Link> */}
            </div>
        </div>
    </Layout>
  )
}

export default RegisterPage