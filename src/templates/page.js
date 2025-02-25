import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout"
import Seo from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"


const Page = (props) => {


    const { markdownRemark: post, site } = props.data;

    return (
        <Layout location={props.location} title={site.siteMetadata.title }>
        <Seo keywords={[`Slate Powell`, `Counselling`]}
          title={post.frontmatter.title}
          description={post.frontmatter.description || ''}
          image={post.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}

        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>
          {post.frontmatter.description && (
            <p className="post-content-excerpt">{post.frontmatter.description}</p>
          )}
          {post.frontmatter.thumbnail && (
            <div className="post-content-image">
              <GatsbyImage
                image={getImage(post.frontmatter.thumbnail)}
                className="kg-image"
                alt={post.frontmatter.title} />
            </div>
          )}
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <footer className="post-content-footer">
          </footer>
        </article>
      </Layout>
    );
};

Page.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Page;

export const PageQuery = graphql`
  query Page {
    site {
        siteMetadata {
          title
        }
      }
    markdownRemark(frontmatter: {templateKey: {eq: "page"}}) {
        frontmatter {
          title
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData
            
            }
          }
        }
        html
      }
  }
`;