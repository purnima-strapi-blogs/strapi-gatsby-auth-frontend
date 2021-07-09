import React from "react";
import { getCurrentUserToken } from "../services/auth";
import Card from "./card";

const Articles = ({ articles, redirect }) => {
    console.log(getCurrentUserToken());
    let leftArticlesCount = 0, leftArticles = 0, rightArticles = 0;

    if(articles) {
        leftArticlesCount = Math.ceil(articles.length / 5);
        leftArticles = articles.slice(0, leftArticlesCount);
        rightArticles = articles.slice(leftArticlesCount, articles.length);
    }

    return (
        articles ?
        <div>
            <div className="uk-child-width-1-2@s" data-uk-grid="true">
                <div>
                    {leftArticles.map((article, i) => {
                        return (
                            <Card
                                article={article}
                                key={`article__left__${article.slug}`}
                                redirect={redirect}
                            />
                        );
                    })}
                </div>
                <div>
                    <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
                        {rightArticles.map((article, i) => {
                            return (
                                <Card
                                    article={article}
                                    key={`article__right__${article.slug}`}
                                    redirect={redirect}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    : 
    <div>
        No articles yet
    </div>
    )
};

export default Articles;
