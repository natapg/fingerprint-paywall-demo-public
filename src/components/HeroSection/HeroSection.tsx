import React, { useState } from 'react'
import styles from './HeroSection.module.scss'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { usePaywall } from '../../context/PaywallContext'
import Skeleton from '../Skeleton/Skeleton'
import { ARTICLES_COUNT_LIMIT } from '../../constants/env'

interface HeroSectionProps {
  data: Queries.FeaturedNewsQuery
  homepath?: boolean
}
export default function HeroSection({ data: newsData, homepath }: HeroSectionProps) {
  const { visitorId, articleCount, isLoading, deleteArticles } = usePaywall()
  const { markdownRemark } = newsData

  return (
    <div className={styles.featuredSection}>
      {markdownRemark?.frontmatter?.img?.childImageSharp?.gatsbyImageData && (
        <GatsbyImage
          image={markdownRemark?.frontmatter?.img?.childImageSharp?.gatsbyImageData}
          alt='Featured image'
          className={styles.featuredImageWrapper}
          style={{
            height: '100%',
            left: '-7.5vw',
            right: '-7.5vw',
            width: 'auto',
            position: 'absolute',
            top: '0',
          }}
          imgStyle={{
            height: '100%',
            left: '50%',
            maxWidth: 'none',
            position: 'absolute',
            top: '50%',
            width: 'auto',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      <div className={styles.featuredNews}>
        <div className={styles.content}>
          <div className={styles.contentBody}>
            <div className={styles.mobile} />
            {markdownRemark?.frontmatter?.featured && <span className={styles.today}>Featured news</span>}
            <h2 className={styles.title}>
              {homepath ? (
                <Link className={styles.titleLink} to={`/article${markdownRemark?.frontmatter?.slug}`}>
                  {markdownRemark?.frontmatter?.title}
                </Link>
              ) : (
                markdownRemark?.frontmatter?.title
              )}
            </h2>
          </div>
        </div>
      </div>
      <div className={styles.visitorDataBox}>
        <div className={styles.visitorData}>
          {visitorId ? (
            <h3 className={styles.visitorId}>Hi {visitorId}</h3>
          ) : (
            <Skeleton className={styles.visitorSkeleton} height={23} width={254} />
          )}
          <p>
            You have read{' '}
            <span>
              {isLoading ? <Skeleton className={styles.articlesSkeleton} height={16} width={10} /> : articleCount}
            </span>{' '}
            of your weekly limit of {ARTICLES_COUNT_LIMIT} free articles.
          </p>

          <button disabled={isLoading || articleCount === 0} className={styles.button} onClick={deleteArticles}>
            Reset Paywall
          </button>
        </div>
      </div>
    </div>
  )
}
