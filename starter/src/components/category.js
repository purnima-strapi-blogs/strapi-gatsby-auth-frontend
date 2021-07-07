import React, { useState, useEffect } from "react";
import ArticlesComponent from "./articles";
import { fetchCategory } from "../services/api";
import Layout from "./layout";


const Category = (props) => {
    console.log("props inside Category", props)
    const [articles, setArticles] = useState([])
    const [category, setCategory] = useState({})
   

    const slug = props.slug
    const seo = {
        metaTitle: category,
        metaDescription: `All ${category} articles`,
    };

    useEffect(() => {
        const callMe = async () => {
            const response = await fetchCategory(slug);
            if (response && response.status) {
                setArticles(response.data.data.articles)
                setCategory(response.data.data.categories[0])
            }
        }
        callMe()
    }, [props.slug])
    
    return (
        <Layout seo={seo}>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{category.name}</h1>
                    <ArticlesComponent articles={articles} />
                </div>
            </div>
        </Layout>
    );
};

export default Category;
