export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs/',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs',
  githubCommunityRepoUrl: 'https://github.com/fingerprintjs/home',
  botDRepoUrl: 'https://github.com/fingerprintjs/BotD',
  botDIntegrationsRepoUrl: 'https://github.com/fingerprintjs/botd-integrations',
  dashboardLoginUrl: 'https://dashboard.fingerprint.com/login',
  careersUrl: 'https://boards.greenhouse.io/fingerprintjs/',
  careersConsoleLogUrl: 'https://grnh.se/bb9c55804us',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs/',
  signupUrl: 'https://dashboard.fingerprint.com/signup',
  statusUrl: 'https://status.fingerprint.com',
  supportMail: 'support@fingerprint.com',
  salesMail: 'sales@fingerprint.com',
  worKMail: 'work@fingerprint.com',
  pressMail: 'press@fingerprint.com',
  discordServerURL: 'https://discord.gg/ad6R2ttHVX',

  docsUrl: 'https://dev.fingerprint.com',
  promotionalVideo: 'https://www.youtube.com/embed/UEYBysyPTBs',
  g2ReviewUrl: 'https://www.g2.com/products/fingerprintjs-fingerprint/reviews',
} as const

export const MAILTO = { mailToUrl: `mailto:${URL.supportMail}` } as const
export const MAILTO_SALES = { mailToUrl: `mailto:${URL.salesMail}` } as const

// links to readme should not have trailing slash to prevent forwarding
export const DOC_URL = {
  documentationUrl: `${URL.docsUrl}/docs`,
  getStartedUrl: `${URL.docsUrl}/docs/quick-start-guide`,
  proVsOpenUrl: `${URL.docsUrl}/docs/pro-vs-open-source`,
  browserFingerprintUrl: `${URL.docsUrl}/docs/browser-fingerprinting`,
  incognitoUrl: `${URL.docsUrl}/docs/incognito-private-mode-detection`,
  serverApiUrl: `${URL.docsUrl}/docs/server-api`,
  legalUrl: `${URL.docsUrl}/docs/dpa-gdpr`,
  termOfUseUrl: `${URL.docsUrl}/docs/terms-of-service`,
  privacyPolicyUrl: `${URL.docsUrl}/docs/privacy-policy`,
  browserSupportUrl: `${URL.docsUrl}/docs/browser-support`,
  webhooksUrl: `${URL.docsUrl}/docs/webhooks`,
  botDUrl: 'https://github.com/fingerprintjs/BotD#botd',
  zeroTrustUrl: `${URL.docsUrl}/docs/zero-trust-mode`,
  bestPracticesUrl: `${URL.docsUrl}/docs/best-practices`,
  migrateUrl: `${URL.docsUrl}/docs/migrating-from-open-source-v3`,
} as const
