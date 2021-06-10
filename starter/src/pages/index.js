import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

export default function Index() {
    
    return (
        <Layout>
            {/* <Logout/> */}
            <h1>Hello {isLoggedIn() ? JSON.stringify(getUser().username) : "Commet ca ve?"}!</h1>
            <p>
                {isLoggedIn() ? (
                <>
                    You are logged in, so check your{" "}
                    <Link to="/app/articles">profile</Link>
                </>
                ) : (
                <>
                    You should <Link to="/app/login">log in</Link> to see restricted
                    content
                </>
                )}
            </p>
        </Layout>
  )
}