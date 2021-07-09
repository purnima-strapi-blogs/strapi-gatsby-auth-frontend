import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import {useAuth} from '../context/authStore/actions'
import Layout from './layout';
import { isLoggedIn } from '../services/auth';

const Login = (props) => {
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

    console.log("props.redirect", props.history)
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const response = await loginAction(emailId, password);   
            //navigate(`/app/articles`)
            navigate(-1, {replace: true})
            
        }
        catch (err) {
            setError(err)
        }
    }

    return (
        <Layout>
            {
            !isLoggedIn() ?
            <div className="uk-section">
            <div className="uk-container">
                <h1>Login</h1>
                <p>Please use your credentials to login</p>
                <Link to="/app/signup" state={{prevPath: location.pathname}}><p>Click here to signup here</p></Link>
                
                <div className="uk-width-medium uk-margin">
                    <div className="uk-card uk-card-large uk-card-default uk-card-body">
                        <form className="uk-form-stacked">
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <label htmlFor="email" className="uk-form-label">Email</label>
                                <input
                                    className="uk-input"
                                    type="email"
                                    name="emailId"
                                    id="email"
                                    placeholder="Enter your email here"
                                    onChange={handleChange}
                                    required={true}
                                />
                                <span className="uk-text-danger"></span>
                            </div>
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <label htmlFor="password" className="uk-form-label">Password</label>
                                <input
                                    className="uk-input"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                                <span className="uk-text-danger"></span>
                            </div>
                            <p uk-margin>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="uk-button uk-button-primary uk-button-large"
                                >
                                    Log In
                                </button>
                            </p>
                        </form>
                        <div>
                            {
                                (error.length > 1) && (
                                    <span className="uk-text-danger">
                                        { error }
                                    </span>
                            )}
                        </div>
                    </div>
                </div>
                <Link to="/app/articles">Go to Home Page</Link>
            </div>
            </div>

            : 

            navigate("/app/articles")
        }
        </Layout>
    )
}

export default Login;