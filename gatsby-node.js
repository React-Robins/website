const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allEvent {
        edges {
          node {
            id
            info {
              link
            }
          }
        }
      }
    }
  `)
  result.data.allEvent.edges.forEach(({ node }) => {
    createPage({
      path: node.info.link,
      component: path.resolve(`./src/templates/city.js`),
      context: {
        slug: node.info.link
      }
    })
  })
}
