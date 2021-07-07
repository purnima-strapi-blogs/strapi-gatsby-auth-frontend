import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ArticlesComponent from "../components/articles";
import "../assets/css/main.css";

const Home = () => {
    const data = useStaticQuery(query);
    console.log(data.allStrapiArticles.edges)
    return (
        <div className="uk-section">
            <div className="uk-container uk-container-large">
                <h1>{data.strapiHomepage.hero.title}</h1>
                <ArticlesComponent articles={data.allStrapiArticles.edges} />
            </div>
        </div>
    );
};

const query = graphql`
  query {
    strapiHomepage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            publicURL
          }
        }
      }
    }
    allStrapiArticles(filter: { status: { eq: "published" } }) {
      edges {
        node {
          strapiId
          slug
          title
          category {
            name
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, height: 500)
              }
            }
          }
          author {
            name
            picture {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 30, height: 30)
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Home;
