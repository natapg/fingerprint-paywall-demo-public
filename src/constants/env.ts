export const HOST = process.env.GATSBY_VERCEL_URL
  ? `https://${process.env.GATSBY_VERCEL_URL}`
  : 'https://fingerprint-paywall-demo.vercel.app'
export const ARTICLES_COUNT_LIMIT = Number(process.env.GATSBY_ARTICLES_COUNT_LIMIT) ?? 4
