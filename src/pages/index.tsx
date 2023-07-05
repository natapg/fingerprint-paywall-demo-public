import * as React from 'react'
import { HeadProps, graphql, useStaticQuery } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import HeroSection from '../components/HeroSection/HeroSection'
import NewArticlesSection from '../components/NewsArticles/NewArticlesSection'
import { SEO } from '../components/SEO/SEO'

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query FeaturedNews {
      markdownRemark(frontmatter: { slug: { eq: "/us-open-2021-rafael-nadal-beats-marin-cilic" } }) {
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
        }
      }
    }
  `) as Queries.FeaturedNewsQuery
  return (
    <Layout>
      <HeroSection data={data} homepath />
      <NewArticlesSection />
    </Layout>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Tennis Chronicles' />
}
