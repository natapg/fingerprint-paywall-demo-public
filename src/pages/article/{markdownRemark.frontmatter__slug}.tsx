import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../../components/Layout/Layout'
import HeroSection from '../../components/HeroSection/HeroSection'
import { usePaywall } from '../../context/PaywallContext'
import styles from './Article.module.scss'
import NewArticlesSection from '../../components/NewsArticles/NewArticlesSection'

interface NewsArticleProps {
  data: Queries.NewsArticlesQuery
}

export default function NewsArticle({ data }: NewsArticleProps) {
  const { markdownRemark } = data
  const { setArticle, paywallEnabled } = usePaywall()

  useEffect(() => {
    if (markdownRemark?.frontmatter?.article_id) {
      setArticle(Number(markdownRemark?.frontmatter?.article_id))
    }
  }, [markdownRemark])

  return (
    <Layout showPaywall={paywallEnabled}>
      <HeroSection data={data} />
      <div className={styles.article}>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark?.html ?? '' }} />
      </div>
      <NewArticlesSection />
    </Layout>
  )
}

export const pageQuery = graphql`
  query NewsArticles($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        img {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        featured
        article_id
      }
    }
  }
`
