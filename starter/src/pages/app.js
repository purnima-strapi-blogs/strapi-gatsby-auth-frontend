import React from "react"
import { Router,Redirect } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Home from '../components/home';
import Login from '../components/login';
import Signup from "../components/signup";
import Article from '../components/article';
import Category from '../templates/category';

const App = ({location, history}) => {
    
    return(   
        <Router>
            <Redirect
                from="/app"
                to="/app/articles"
                noThrow
            />
            <Home exact path="/app/articles" />
            <PrivateRoute exact path={`/app/articles/:slug`} component={Article}/>
            <Category exact path={`/category/:slug`} />
            <Login path="/app/login" />
            <Signup path="/app/signup" />
        </Router>    
    )
}
export default App;