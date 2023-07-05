import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const resolvePath = (directoryName: string, pathName: string) => {
  const result = path.join(directoryName, pathName)
  if (process.platform === 'win32') {
    return result.replace(/\\/g, '\\\\')
  }

  return result
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Fingerprint Firewall`,
    siteUrl: `https://fingerprint-paywall-demo.vercel.app`,
    description:
      'The Fingerprint device intelligence platform works across web and mobile applications to identify all visitors with 99.5% accuracy — even if they’re anonymous.',
    image: 'https://fingerprint-paywall-demo.vercel.app/img/fpjs-preview.png',
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@import "${resolvePath(__dirname, '/src/styles/common')}";`,
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-svgr',
  ],
}

export default config
