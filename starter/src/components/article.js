import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Layout from "./layout";
import Markdown from "react-markdown";
import { fetchArticle } from "../services/api";
import { navigate } from "@reach/router";
import axios from "axios";

const Article = (props) => {
  const [singleArticle, setArticle] = useState({});
  const [error, setError] = useState("");

  const seo = singleArticle && {
    metaTitle: singleArticle.title,
    metaDescription: singleArticle.description,
    shareImage: singleArticle.image,
    article: true,
  };
  
  useEffect(() => {
    const fetchSingleArticle = async () => {
    //   console.log(props.slug);
    //   axios.defaults.withCredentials = true;
    //   const { data } = await axios({
    //     method: "GET",
    //     url: `http://localhost:1337/articles/${props.slug}`,
    //   });
    
        const { data} = await fetchArticle(props.slug);
       
         setArticle(data.data.article);
    };

    fetchSingleArticle();
  }, []);
 
  return (
    singleArticle &&
    Object.keys(singleArticle).length && (
      <Layout seo={seo}>
        <div>
          <div style={{ display: "grid" }}>
            {singleArticle.image.formats &&
            singleArticle.image.formats.large ? (
              <img
                src={`${process.env.GATSBY_SERVER_API_URL}${singleArticle.image.formats.large.url}`}
                alt={`Picture for ${singleArticle.title} article`}
                style={{
                  gridArea: "1/1",
                  width: "100%",
                }}
              />
            ) : (
              <img
                src={`${process.env.GATSBY_SERVER_API_URL}${singleArticle.image.formats.medium.url}`}
                alt={`Picture for ${singleArticle.title} article`}
                style={{
                  gridArea: "1/1",
                  width: "100%",
                }}
              />
            )}
            <div
              style={{
                // By using the same grid area for both, they are stacked on top of each other
                gridArea: "1/1",
                position: "relative",
                // This centers the other elements inside the hero component
                placeItems: "center",
                display: "grid",
              }}
            >
              <h1 style={{ color: `white` }}>{singleArticle.title}</h1>
            </div>
          </div>
          <div className="uk-section">
            <div className="uk-container uk-container-small">
              <Markdown source={singleArticle.content} escapeHtml={false} />

              <hr className="uk-divider-small" />

              <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                <div>
                  {singleArticle.author && (
                    <img
                      src={`${process.env.GATSBY_SERVER_API_URL}${singleArticle.author.picture.formats.thumbnail.url}`}
                      alt={`Picture of ${singleArticle.author.name}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
                <div className="uk-width-expand">
                  <p className="uk-margin-remove-bottom">
                    By {singleArticle.author.name}
                  </p>
                  <p className="uk-text-meta uk-margin-remove-top">
                    <Moment format="MMM Do YYYY">
                      {singleArticle.published_at}
                    </Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Article;
