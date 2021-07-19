import axios from 'axios';

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
            url: `http://localhost:1337/auth/cookielogin`,
            data: {
              identifier: email,
              password
            },
            withCredentials: true
        });
        console.log("data", data)
        return data
    } catch(err) {
        console.log(err)
    }
}

export async function logout() {
    try {
        const data = await axios({
            method: 'post',
            url: `http://localhost:1337/logout`,
            withCredentials: true
        });
        console.log("logout response is", data)
        return data
    } catch(err) {
        console.log(err)
    }
}

export async function fetchArticles() {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:1337/graphql`,
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
            },
        });
        return response
    } catch(err) {
        console.log("err", err)
    }
}


export async function fetchArticle(id) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:1337/graphql`,
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
            },
            withCredentials: true
        });
        return response
    } catch(err) {
        console.log("err", err)
    }
}
