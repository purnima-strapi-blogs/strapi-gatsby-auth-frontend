import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
// import Profile from "../components/profile"
// import Login from "../components/login"
import Home from './home';
import Login from '../components/login';
import Signup from "../components/signup";
import { useEffect } from 'react';
import { getUser, isLoggedIn } from "../services/auth";
import { navigate } from '@gatsbyjs/reach-router';
import Logout from '../components/logout';
import Article from '../templates/article';

const Index = ({location, history}) => {
    return(
        <Layout> 
            <Logout/>
            <Router>
                <PrivateRoute exact path="/app/articles" component={Home}/>
                <PrivateRoute exact path={`/app/articles/:slug`} component={Article} />
                <Login path="/app/login" location={location} history={history}/>
                <Signup path="/app/signup" />
            </Router>
        </Layout>
    )
}
export default Index;