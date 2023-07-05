import React from 'react'
import styles from './Footer.module.scss'
import { ReactComponent as Icon } from '../../images/icon.svg'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Link className={styles.footerWrapper} to='/'>
          <Icon className={styles.icon} />
          <h1 className={styles.title}>
            Tennis<span className={styles.chronicles}>Chronicles</span>
          </h1>
        </Link>
        <div className={styles.copy}>© Tennis Chronicles, 2023</div>
      </div>
      <div className={styles.disclaimer}>
        Disclaimer: Not a real newspaper. Created to demonstrate the{' '}
        <a className={styles.link} target='_blank' rel='noreferrer' href='https://www.fingerprint.com'>
          Fingerprint Pro Paywall technology
        </a>
        , provided by{' '}
        <a className={styles.link} target='_blank' rel='noreferrer' href='https://www.fingerprint.com'>
          fingerprint.com
        </a>
      </div>
    </footer>
  )
}
