import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

// eslint-disable-next-line
const IndexPage = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout title={siteTitle}>
            <Seo keywords={[`Slate Powell`, `Counselling`]}
                title={data.markdownRemark.frontmatter.title}
                description={data.markdownRemark.frontmatter.description ||  ''}
                image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid.src}

            />           
            <div className="post-feed">
                {posts.map(({ node }, index) => {
                    return (
                        <PostCard
                            key={node.fields.slug}
                            count={index + 1}
                            node={node}
                            postClass={`post`}
                        />
                    )
                })}
            </div>
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