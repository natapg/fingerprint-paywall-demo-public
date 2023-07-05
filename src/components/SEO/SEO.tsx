import React from 'react'

import { useSiteMetadata } from '../../hooks/useSiteMetadata'

type SeoProps = {
  title?: string
  pathname?: string
  children?: React.ReactNode
}
export function SEO({ title, pathname, children }: SeoProps) {
  const { title: defaultTitle, siteUrl } = useSiteMetadata()
  const seo = {
    title: title ?? defaultTitle,
    url: `${siteUrl}${pathname ?? ``}`,
  }
  return (
    <>
      <title>{seo.title}</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-type' content='text/html; charset=UTF-8' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={seo.url} />
      <meta property='og:title' content={title} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:url' content={seo.url} />

      {children}
    </>
  )
}
