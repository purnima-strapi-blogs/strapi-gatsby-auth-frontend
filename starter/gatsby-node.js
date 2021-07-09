const axios = require('axios');

exports.onCreateWebpackConfig = ({
    actions,
    plugins,
    stage
}) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                path: require.resolve("path-browserify")
            },
            fallback: {
                fs: false,
            }
        }
    })
    if (stage === 'build-javascript' || stage === 'develop') {
        actions.setWebpackConfig({
            plugins: [
                plugins.provide({ process: 'process/browser' })
            ]
        })
    }
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    /* page.matchPath is a special key that's used for matching pages
    only on the client. */
    if (page.path.match(/^\/app/)) {
        console.log("matched app", page.path.match(/^\/app/))
        page.matchPath = "/app/*"
        // Update the page.
        createPage(page)
    }
}


exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
        query {
            allStrapiCategory {
            edges {
                node {
                slug
                }
            }
            }
        }
    `)
      
    data.allStrapiCategory.edges.forEach(category => {
        const slug = category.node.slug;
        console.log("node.slug", category.node.slug);
        actions.createPage({
            path: `/app/category/${slug}`,
            component: require.resolve(`./src/templates/category.js`),
            context: { slug: slug },
        })
    })
    
}
