import React from "react"
import { Router,Redirect } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Home from '../components/home';
import Login from '../components/login';
import Signup from "../components/signup";
import Article from '../components/article';
import Category from '../components/category';

const Index = ({location, history}) => {
    return(        
        <Router>
            <Redirect
                from="/app"
                to="/app/articles"
                noThrow
            />
            <PrivateRoute exact path="/app/articles" component={Home}/>
            <PrivateRoute exact path={`/app/articles/:slug`} component={Article} />
            <PrivateRoute exact path={`/app/category/:slug`} component={Category} />
            <Login path="/app/login" />
            <Signup path="/app/signup" />
        </Router>     
    )
}
export default Index;