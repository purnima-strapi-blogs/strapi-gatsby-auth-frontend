import axios from 'axios';
import { getCurrentUserToken } from './auth';


export async function signup(username, email, password) { 
    try {
        const data = await axios({
            method: 'POST',
            url: `${process.env.GATSBY_SERVER_API_URL}/auth/local/register`,
            data: {
                username: username,
                email: email,
                password: password
            },
            headers:{
                'Content-Type': 'application/json',
            }
        })
        return data
       
    } catch(err) {
        console.error("err inside api.js", err);
        throw(err);
    }   
}

export async function login(email, password) {
    try {
        const data = await axios({
            method: 'post',
            url: `http://localhost:1337/auth/local`,
            data: {
              identifier: email,
              password
            },
            // withCredentials: true
        });
        return data
    } catch(err) {
        throw err.response.data.message[0].messages[0].message;
    }
}

export async function fetchArticles() {
    const token = getCurrentUserToken();
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:1337/graphql`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: { 
                query: `
                    query Articles {
                        homepage {
                            hero {
                                title
                            }
                            seo {
                                metaTitle
                                metaDescription
                                shareImage {
                                url
                                }
                            }
                        }
                        articles {
                            id
                            title
                            slug
                            category {
                                id
                                name
                            }
                            image {
                                formats 
                            }
                            author {
                                id
                                name
                                picture {
                                    formats
                                }
                            }
                        }
                    }
                `   
            }
        });
        console.log("data returned", response)
        return response
    } catch(err) {
        console.log("err", err)
        throw err.response.data.message[0].messages[0].message;
    }
}


export async function fetchArticle(id) {
    const token = getCurrentUserToken();
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:1337/graphql`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            data: { 
                query: `
                    query($id: ID!){
                        article(id: $id ) {
                            id
                            title
                            content
                            publishedAt
                            description
                            image {
                                formats
                            } 
                            author {
                                name
                                picture {
                                    formats
                                }
                            }
                        }
                    }`,
                    variables: {
                        id: id,
                    },
            }
        });
        console.log("data returned", response)
        return response
    } catch(err) {
        console.log("err", err)
        throw err.response.data.message[0].messages[0].message;
    }
}

// export async function fetchArticle(slug) {
//     const token = getCurrentUserToken();
//     try {
//         const response = await axios({
//             method: 'get',
//             url: `http://localhost:1337/articles/${slug}`,
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` 
//             },
           
//         });
//         console.log("data returned", response)
//         return response
//     } catch(err) {
//         console.log("err", err)
//         throw err.response.data.message[0].messages[0].message;
//     }
// }



// export async function fetchArticle(slug) {
//     const token = getCurrentUserToken();
//     try {
//         const response = await axios({
//             method: 'post',
//             url: `http://localhost:1337/graphql`,
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` 
//             },
//             data: { 
//                 query: `
//                     query ArticleQuery($slug: String!) {
//                         articles(where: {slug: $slug}) {
//                                 id
//                                 title
//                                 description
//                                 content
//                                 publishedAt
//                                 image {
//                                     formats
//                                 } 
//                                 author {
//                                     name
//                                     picture {
//                                         formats
//                                     }
//                                 }
//                             }
//                         }
//                     `,
//                 variables: {
//                     slug: slug,
//                 },
//             }
//         });
//         console.log("data returned", response)
//         return response
//     } catch(err) {
//         console.log("err", err)
//         throw err.response.data.message[0].messages[0].message;
//     }
// }

// export async function fetchCategory(slug) {
//     const token = getCurrentUserToken();
//     try {
//         const response = await axios({
//             method: 'post',
//             url: `http://localhost:1337/graphql`,
//             headers: { 
//                 'Content-Type': 'application/json', 
//                 'Authorization': `Bearer ${token}` 
//             },
//             data: { 
//                 query: `
//                     query Category($slug: String!) {
//                         categories(where: {slug: $slug }) {
//                             name
//                         }
//                         articles(where: { status: "published" , category: { slug: $slug  } }) {
//                             slug
//                             title
//                             category {
//                                  name
//                             }
//                             image {
//                                 formats
//                             }
//                             author {
//                                 name
//                                 picture {
//                                     formats
//                                 }
//                             }
//                         }
//                     }
//                 `,
//                 variables: {
//                     slug: slug,
//                 },
//             }
//         });
//         console.log("data returned", response)
//         return response
//     } catch(err) {
//         console.log("err", err)
//         // throw err.response.data.message[0].messages[0].message;
//     }
// }


