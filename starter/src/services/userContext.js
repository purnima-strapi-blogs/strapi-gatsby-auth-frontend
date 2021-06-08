import React, { createContext, useContext, useReducer } from 'react'
// import axios from 'axios'
// const apiURL = process.env.GATSBY_API_URL
// console.log("apiUrL is", apiURL);
const DEFAULT_STATE = {
  jwt: null,
  userName: {},
  loggedIn: false,
  error: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN': 
      const { jwt, userName } = action.payload
      console.log("LOGIN Action", jwt, userName)
      return { ...state, jwt, userName, loggedIn: true, error: '' }
    case 'LOGOUT': 
      return { ...state, jwt: null, userName: {}, loggedIn: false, error: '' }
    case 'LOGIN_ERROR': 
      return { ...state, jwt: null, userName: {}, loggedIn: false, error: 'Logged in error' }
    default:
      return DEFAULT_STATE
  }
}

const AuthContext = createContext()

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
    { children }
  </AuthContext.Provider>
)

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    { element }
  </AuthProvider>
)

const useAuth = () => {
    const [state, dispatcher] = useContext(AuthContext)
    
    const isAuthenticated = state.loggedIn && Object.keys(state.userName).length
    console.log("state is", state, dispatcher)
        
    console.log("isAuthenticated", isAuthenticated)
    const login = (credentials) => new Promise(async (resolve, reject) => {
        try{
        // const { data: payload } = await axios.post(`${apiURL}`, credentials)
        const data = await axios.post(`${apiURL}`, credentials)
        const payload = data.data;
        console.log("data is",payload)
        dispatcher({ type: 'LOGIN', payload })
        resolve(payload)
        }catch(e){
        dispatcher({ type: "LOGIN_ERROR"})
        reject(e)
        }
    })
    const logout = () => {
        dispatcher({ type: 'LOGOUT' })
    }
    console.log("state is", state)
    return { state, isAuthenticated, login, logout } 
}

export default useAuth;