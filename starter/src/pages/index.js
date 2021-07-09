import React from "react"
import Layout from "../components/layout"
import { Link } from 'gatsby';
import App from './app';


const Index = () => {
    return(   
        <Layout>
            <div style={{ textAlign: "center", margin: "10%" }}>
                <p>
                    Hi, Explore all the articles
                    <Link to="/app/articles"> here</Link>.
                </p>
                <App></App>
            </div>
        </Layout>
    )
}
export default Index;