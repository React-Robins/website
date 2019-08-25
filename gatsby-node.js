const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allJavascriptFrontmatter {
        edges {
          node {
            id
            frontmatter {
              info {
                link
              }
            }
          }
        }
      }
    }
  `)
  result.data.allJavascriptFrontmatter.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.info.link,
      component: path.resolve(`./src/templates/city.js`),
      context: {
        slug: node.frontmatter.info.link
      }
    })
  })
}
