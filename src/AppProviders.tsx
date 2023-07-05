import React from 'react'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { PaywallProvider } from './context/PaywallContext'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  const publicApiKey = process.env.GATSBY_FPJS_PUBLIC_TOKEN
  const scriptUrlPattern = process.env.GATSBY_FPJS_SCRIPT_URL_PATTERN
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: publicApiKey ?? '',
        scriptUrlPattern,
      }}
    >
      <PaywallProvider>
        <React.StrictMode>{children}</React.StrictMode>
      </PaywallProvider>
    </FpjsProvider>
  )
}
