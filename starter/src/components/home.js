import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ArticlesComponent from "./articles";
import "../assets/css/main.css";
import Layout from './layout';


const Home = () => {
    const data = useStaticQuery(query);
     
    return (
        <Layout>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{data.allStrapiHomepage.edges[0].node.hero.title}</h1>
                    <ArticlesComponent articles={data.allStrapiArticles.edges}/>
                </div>
            </div>
        </Layout>
    );
};

const query = graphql`
  query {
    allStrapiHomepage {
      # hero {
      #   title
      # }
      # seo {
      #   metaTitle
      #   metaDescription
      #   shareImage {
      #     localFile {
      #       publicURL
      #     }
      #   }
      # }
      edges {
      node {
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
