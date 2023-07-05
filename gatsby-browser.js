import './src/styles/custom-properties.scss'
import './src/styles/global-styles.scss'

import React from 'react'
import AppProviders from './src/AppProviders'
import { URL } from './src/constants/content'

export const wrapPageElement = ({ element }) => <AppProviders>{element}</AppProviders>

export const onInitialClientRender = () => {
  /* eslint-disable */
  setTimeout(console.log(`Like breaking things to see how they work? Join us: ${URL.careersConsoleLogUrl}`), 750)
  setTimeout(console.log('Have a great day! 🫶🏻'), 750)
}
