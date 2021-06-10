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