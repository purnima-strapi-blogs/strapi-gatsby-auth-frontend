import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import useAuth from '../context/actions';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { signupAction } = useAuth();

    const handleChange = (event) => {

        if(event.target.name === "email") {
            setEmail(event.target.value)
        } else if(event.target.name === "password") {
            setPassword(event.target.value)
        } else if(event.target.name === "username") {
            setUsername(event.target.value)
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await signupAction(username, email, password)        
            if(response instanceof Error) {
                throw new Error(response)
            }
            if(response && response.status && response.status === 200) {
                navigate("/login")
            } 
        } catch(err) {
            console.log("err inside signup", err.message)
            setError('Email is already taken')
        }  
    }
    return (
        <div className="uk-section">
            <div className="uk-container">
                <h1>Sign Up</h1>
                <p>Register here</p>
                <Link to="/app/login"><p>Click here to login instead</p></Link>
        
                <div className="uk-width-medium uk-margin">
                    <div className="uk-card uk-card-large uk-card-default uk-card-body">
                        <form className="uk-form-stacked">
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <input 
                                    className="uk-input"
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username here"
                                    onChange={handleChange}        
                                />
                            </div>
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <input 
                                    className="uk-input"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email here"
                                    onChange={handleChange}           
                                />
                            </div>
                            <div className="uk-width-1-2@s uk-margin uk-align-center">
                                <input 
                                    className="uk-input"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                            </div>
                            <p uk-margin>  
                                <button
                                    onClick={handleSubmit}
                                    className="uk-button uk-button-primary uk-button-large"
                                >
                                Signup Here
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
            </div>
        </div>    
    )
}

export default Signup;