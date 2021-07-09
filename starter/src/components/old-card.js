import React from "react";
import { Link } from "gatsby";

const Card = ({ article }) => {
    return (
        article && (
            <Link to={`/app/articles/${article.slug}`} className="uk-link-reset">
            <div className="uk-card uk-card-muted">
                <div className="uk-card-media-top">
                    {
                        article.image && article.image.formats.large 
                        ? 
                        <img src={`${process.env.GATSBY_SERVER_API_URL}${article.image.formats.large.url}`} alt="" />
                        :
                        <img src={`${process.env.GATSBY_SERVER_API_URL}${article.image.formats.medium.url}`} alt="" />
                             
                    }   
                </div>
                <div className="uk-card-body">
                    <p id="category" className="uk-text-uppercase">
                        {article.category.name}
                    </p>
                    <p id="title" className="uk-text-large">
                        {article.title}
                    </p>
                    <div>
                        <hr className="uk-divider-small" />
                        <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                            <div>
                                {article.author.picture && (
                                   <img 
                                        src={`${process.env.GATSBY_SERVER_API_URL}${article.author.picture.formats.thumbnail.url}`} 
                                        alt={`Picture of ${article.author.name}`} 
                                        style={{borderRadius: "50%", "width": "30px", "height": "30px"}}
                                    />
                                )}
                            </div>
                            <div className="uk-width-expand">
                                <p className="uk-margin-remove-bottom">
                                    {article.author.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        )
    );
};

export default Card;