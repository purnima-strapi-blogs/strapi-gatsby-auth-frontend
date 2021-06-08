import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import axios from 'axios';
// import '../assets/css/main.css'
// import useAuth from '../hooks/useAuth'
import { signup } from '../services/api';

const Signup = ({ redirect }) => {
    // const { state, login } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event) => {

        if(event.target.name === "email") {
            setEmail(event.target.value)
        } else if(event.target.name === "password") {
            setPassword(event.target.value)
        } else if(event.target.name === "username") {
            setUsername(event.target.value)
        }
    }
    console.log("process.env.SERVER_API_URL", `${process.env.GATSBY_SERVER_API_URL}`);
    const handleSubmit = async (event) => {
        console.log("event called", event)
        event.preventDefault()
        console.log(username, email, password)
        /* 
            Make API request to the backend and send email and password 
            and clear the input fields value
        */
        try {
            const data = await signup(username, email, password)
            console.log("data is", data);

            if(data.status === 200) {
                navigate("/login")
            }

        } catch(err) {
            console.log("err inside signup", err)
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
                </div>
            </div>
        </div>
    </div>    
  )
}

export default Signup;