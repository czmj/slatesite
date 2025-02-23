import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout"

// eslint-disable-next-line
const IndexPage = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout title={siteTitle}>
          <p>Home page</p>
        </Layout>
    )
}
export default IndexPage
export const IndexPageQuery = graphql`
  query IndexPage {
    site {
        siteMetadata {
          title 
        }
      }
      markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
        frontmatter {
          title
          description
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        
      }
      allMarkdownRemark(
        filter: {frontmatter: {pagetype: {eq: "main"}}}
        limit: 30
        sort: {frontmatter: {number: ASC}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD,YYYY")
              title
              description
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 1360) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
  }
`;