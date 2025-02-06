const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
    {
      allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              date(formatString: "DD:MM:YYYY hh:mm")

            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const allPage = result.data.allMarkdownRemark.edges
    allPage.forEach((post, index) => {
      const previous = index === allPage.length - 1 ? null : allPage[index + 1].node
      const next = index === 0 ? null : allPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          slug: post.node.fields.slug,
        },
      })
    })
    return null
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
