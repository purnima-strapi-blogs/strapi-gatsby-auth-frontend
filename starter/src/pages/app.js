// import React, { useEffect, useState } from 'react';
// import { Router } from '@reach/router';
// import { navigate } from "gatsby"
// import Layout from "../components/layout";
// // import Signup from '../components/Signup';
// import Home from './home';
// import Login from './login';
// import "../assets/css/main.css";

// const IndexPage = () => {
//     const isAutheticated = false;
//     const [user, setUser] = useState('');

//     // // useEffect(() => {
//     // //     if(!isAutheticated) {
//     // //         navigate('/login')
//     // //     }
//     // // }, [isAutheticated])
//     // useEffect(() => {
//     //     if(user) {
//     //         setUser(user)
//     //     }
//     // }, [user])

//     return (
//         <Router basepath="/">
//             <Home path="/app/profile" />
//             <Login path="/login" setUser={() => setUser(user)}/>
//             <Signup path="/signup" />
//         </Router>
//     )
// };


// export default IndexPage;


import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Home from './home';
import Login from '../components/login';
import Signup from "../components/signup";
import { graphql, useStaticQuery } from "gatsby";

import Logout from '../components/logout';
import Article from '../pages/article/{StrapiArticle.slug}';

// export const query = graphql`
//   query ArticleQuery($slug: String!) {
//     strapiArticle(slug: { eq: $slug }, status: { eq: "published" }) {
//       strapiId
//       title
//       description
//       content
//       publishedAt
//       image {
//         localFile {
//           publicURL
//           childImageSharp {
//             gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
//           }
//         }
//       }
//       author {
//         name
//         picture {
//           localFile {
//             childImageSharp {
//               gatsbyImageData(width: 30)
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const Index = ({ location, history}) => {

        // const data = useStaticQuery(query);
        // console.log("data ",  data)
        // // useEffect(() => {
        // //     if(!getUser()) {
        // //         navigate(`/app/login`)
        // //     }
        // // }, getUser)
        //console.log('/article/${article.node.slug', `/article/`)
    return(
        <Layout>
              {/* <userContext.Provider value={this.state.user}> */}
                <Logout/>
                <Router>
                    <PrivateRoute path="/app/profile" component={Home}/>
          
                    <PrivateRoute exact path="/app/article/:slug" component={Article} />
                    <Login path="/app/login" location={location} history={history}/>
                    <Signup path="/app/signup" />
                </Router>
            {/* </userContext.Provider>       */}
        </Layout>
    )
}
export default Index;

