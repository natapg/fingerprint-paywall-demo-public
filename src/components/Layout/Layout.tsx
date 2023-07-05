import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'
import classNames from 'classnames'
import { ARTICLES_COUNT_LIMIT } from '../../constants/env'
import { ReactComponent as Close } from '../../images/close.svg'
import { Link } from 'gatsby'

interface LayoutProps {
  children: React.ReactNode
  showPaywall?: boolean
}
export function Layout({ children, showPaywall = false }: LayoutProps) {
  const [paywallEnabled, setPaywallEnabled] = useState(false)

  useEffect(() => {
    if (showPaywall) {
      const timer = setTimeout(() => {
        setPaywallEnabled(true)
      }, 500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [showPaywall])

  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.layoutContent}>{children}</div>
      <Footer />
      <div
        className={classNames(styles.paywallModal, {
          [styles.show]: paywallEnabled,
        })}
      >
        <div className={styles.backdrop} />
        <Link className={styles.close} to='/'>
          <Close className={styles.closeIcon} />
        </Link>
        <div className={styles.dialog}>
          <div className={styles.content}>
            <div className={styles.boxWrapper}>
              <div className={styles.limitSection}>
                You have reached your limit of {ARTICLES_COUNT_LIMIT} articles this week. The paywall is working!
                <br />
                <br /> Try to get around this paywall by opening this article in incognito mode (copy and paste the
                URL).
              </div>
              <p className={styles.description}>
                Set up your own next gen paywall solution with Fingerprint Pro, the most accurate user identification
                API available.
              </p>
              <a target='_blank' rel='noreferrer' href='https://dashboard.fingerprint.com/signup/'>
                <button className={styles.button}>Get Started</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
