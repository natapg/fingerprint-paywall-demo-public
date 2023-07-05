import React from 'react'

import AppProviders from './src/AppProviders'

export const wrapPageElement = ({ element }) => <AppProviders>{element}</AppProviders>
