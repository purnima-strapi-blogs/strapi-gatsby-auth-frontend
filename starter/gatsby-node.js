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

// exports.onPreInit = async ({ actions, store }) => {
//   const { setPluginStatus } = actions;
//   const state = store.getState();
//   const plugin = state.flattenedPlugins.find(plugin => plugin.name === "gatsby-source-strapi");
//   // console.log("state is", state);
//   // console.log("setPluginStatus", setPluginStatus)
//   // if (plugin) {
//   //     const matomo_site_id = await fetchMatomoSiteId('API_ENDPOINT_URL');
//   //     plugin.pluginOptions = {...plugin.pluginOptions, ...{ siteId: matomo_site_id }};
//   //     setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
//   // }
// };


exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        console.log("matched app", page.path.match(/^\/app/))
        page.matchPath = "/app/*"
        // Update the page.
        createPage(page)
    }

    // if (page.path.match(/^\/article/)) {
    //     page.matchPath = '/article/*';
    
    //     createPage(page);
    // }
}

// exports.createPages = async function ({ actions, graphql }) {
//     const { data } = await graphql(`
//     query {
//         allStrapiArticle {
//           edges {
//             node {
//               slug
//             }
//           }
//         }
//       }      
//     `)
  
//     data.allStrapiArticle.edges.forEach(article => {
//         const slug = article.node.slug;
//         console.log("node.slug", article.node.slug);
//         actions.createPage({
//             path: slug,
//             component: require.resolve(`./src/pages/article/${slug}.js`),
//             context: { slug: slug },
//         })
//     })
// }