import React, { useEffect, useState } from "react";
import ArticlesComponent from "./articles";
import { fetchArticles } from "../services/api";
import Layout from "./layout";
import "../assets/css/main.css";

const Home = () => {
    const [articles, setArticles] = useState([])
    const [homepage, setHomePageData] = useState({})
    const [error, setError] = useState([])

    useEffect(() => {
        const callMe = async () => {
            const response = await fetchArticles();
            if (response && response.status) {
                setArticles(response.data.data.articles)
                setHomePageData(response.data.data.homepage)
            }

            if (response.data.errors && response.data.errors.length > 0) {
                setError(response.data.errors)
            }
        }
        callMe()
    }, [])

    return (
        <Layout>
            (

            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{Object.keys(homepage).length && homepage.hero.title}</h1>
                    <ArticlesComponent articles={articles} />

                </div>
            </div>

            )

        </Layout>
    );
};


export default Home;
