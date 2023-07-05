import React from 'react'
import styles from './NewArticlesSection.module.scss'
import { GatsbyImage } from 'gatsby-plugin-image'

import { graphql, useStaticQuery, Link } from 'gatsby'

export default function NewArticlesSection() {
  const data = useStaticQuery(graphql`
    query AllNews {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            title
            img {
              childImageSharp {
                gatsbyImageData(height: 428, width: 760)
              }
            }
          }
        }
      }
    }
  `) as Queries.AllNewsQuery

  const newsArray = data.allMarkdownRemark.nodes

  return (
    <div className={styles.newArticlesSection}>
      <h3 className={styles.newsTitle}>Tennis News</h3>
      <div className={styles.newArticles}>
        {newsArray.map((news) => (
          <div className={styles.newArticle} key={news.frontmatter?.slug}>
            {news.frontmatter?.img?.childImageSharp?.gatsbyImageData && (
              <>
                <Link className={styles.imageSection} to={`/article${news.frontmatter.slug}`}>
                  <GatsbyImage
                    alt={news.frontmatter?.title ?? ''}
                    image={news.frontmatter?.img?.childImageSharp.gatsbyImageData}
                  />
                </Link>

                <div className={styles.linkSection}>
                  <h4 className={styles.linkTitle}>
                    <Link className={styles.link} to={`/article${news.frontmatter.slug}`}>
                      {news.frontmatter.title}
                    </Link>
                  </h4>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
