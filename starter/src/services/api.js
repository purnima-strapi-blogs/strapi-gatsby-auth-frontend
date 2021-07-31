import axios from "axios";

export async function signup(username, email, password) {
  try {
    const data = await axios({
      method: "POST",
      url: `http://localhost:1337/auth/local/register`,
      data: {
        username: username,
        email: email,
        password: password,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error("err inside api.js", err);
    throw err;
  }
}

export async function login(email, password) {
  try {
    const response = await axios({
      method: "POST",
      url: `http://localhost:1337/auth/local`,
      data: {
        identifier: email,
        password,
      },
      withCredentials: true,
    });
    return response;
  } catch (err) {
      console.log(err.response)
      console.log(err.message, err.statusCode);
      throw err.response.data.message[0].messages[0].message
  }
}

export async function logout() {
  try {
    const data = await axios({
      method: "post",
      url: `http://localhost:1337/logout`,
      withCredentials: true,
    });
    console.log("logout response is", data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchArticle(id) {
  try {
    const response = await axios({
      method: "POST",
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
      withCredentials: true,
    });

    console.log(response);
    return response;
  } catch (err) {
    console.log("err", err);
  }
}
