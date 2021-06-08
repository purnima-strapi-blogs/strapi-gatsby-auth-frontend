import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import useAuth from '../context/actions'


const Login = ({ location, history }) => {
    // const { state, login } = useAuth()
    const [emailId, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { loginAction} = useAuth()

    const handleChange = (event) => {

        if (event.target.name === "emailId") {
            setEmail(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(emailId, password)
        /* 
            Make API request to the backend and send identifier and password 
            and clear the input fields value
        */
        try {
            // const currentUser = await login(emailId, password);
            // const {jwt, user: {username, email} = {}} = currentUser.data;
           
            //save user in localstorage

            // setUser({jwt, username, email})
           
            await loginAction(emailId, password);
            navigate(`/app/profile`)
        }
        catch (err) {
            console.log("err", err)

        }
    }
    
    // if (isLoggedIn()) {
    //     navigate(`/app/profile`)
    // }
  

    return (
        <div className="uk-section">
            <div className="uk-container">
                <h1>Login</h1>
                <p>Please use your credentials to login</p>
                <Link to="/app/signup" state={{prevPath: location.pathname}}><p>Click here to signup here</p></Link>
                
                <div className="uk-width-medium uk-margin">
                    <div className="uk-card uk-card-large uk-card-default uk-card-body">
                        <form className="uk-form-stacked">
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <input
                                    className="uk-input"
                                    type="email"
                                    name="emailId"
                                    placeholder="Enter your email here"
                                    onChange={handleChange}
                                //value={identifier}
                                />
                            </div>
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <input
                                    className="uk-input"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                //value={password}
                                />
                            </div>
                            <p uk-margin>
                                <button
                                    onClick={handleSubmit}
                                    className="uk-button uk-button-primary uk-button-large"
                                >
                                    Log In
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
                <Link to="/app/profile">Go to Home Page</Link>
            </div>
        </div>
    )
}

export default Login;