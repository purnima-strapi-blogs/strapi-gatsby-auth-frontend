import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Moment from "react-moment";
import Layout from "../components/layout";
import Markdown from "react-markdown";
import axios from 'axios';

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }) {
      strapiId
      title
      description
      content
      publishedAt
      image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
          }
        }
      }
      author {
        name
        picture {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 30)
            }
          }
        }
      }
    }
  }
`;

const Article = ({ pageContext: { slug }, data }) => {
  const [singleArticle, setArticle] = useState({});

  const article = data.strapiArticle;
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  useEffect(async () => {
    const response = await axios.get(`http://localhost:1337/articles/${slug}`)
    setArticle(response.data)

  }, [])

  console.log("singleArticle", singleArticle);

  return (
    <Layout seo={seo}>
      <div>
        <div style={{ display: "grid" }}>
          <GatsbyImage
            style={{
              gridArea: "1/1",
            }}
            alt={`Picture for ${article.title} article`}
            image={article.image.localFile.childImageSharp.gatsbyImageData}
            layout="fullWidth"
          />
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
            <h1 style={{ color: `white` }}>{article.title}</h1>
          </div>
        </div>
        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <Markdown source={article.content} escapeHtml={false} />

            <hr className="uk-divider-small" />

            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
              <div>
                {article.author.picture && (
                  <GatsbyImage
                    image={
                      article.author.picture.localFile.childImageSharp
                        .gatsbyImageData
                    }
                    alt={`Picture of ${article.author.name}`}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>
              <div className="uk-width-expand">
                <p className="uk-margin-remove-bottom">
                  By {article.author.name}
                </p>
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;


// {path: "/articles/the-internet-s-own-boy", location: {…}, pageResources: {…}, uri: "/articles/the-internet-s-own-boy", navigate: ƒ, …}
// children: undefined
// data: {strapiArticle: {…}}
// location: {pathname: "/articles/the-internet-s-own-boy", search: "", hash: "", href: "http://localhost:8000/articles/the-internet-s-own-boy", origin: "http://localhost:8000", …}
// navigate: ƒ navigate(to, options)
// pageContext: {slug: "the-internet-s-own-boy"}
// pageResources: {json: {…}, page: {…}, staticQueryResults: {…}, component: ƒ}
// params: {}
// path: "/articles/the-internet-s-own-boy"
// uri: "/articles/the-internet-s-own-boy"
// key: (...)
// get key: ƒ ()
// __proto__: Object