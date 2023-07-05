import React, { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import classNames from 'classnames'
import { ReactComponent as Icon } from '../../images/icon.svg'
import { Link } from 'gatsby'
import { usePaywall } from '../../context/PaywallContext'
import { ARTICLES_COUNT_LIMIT } from '../../constants/env'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export default function Header() {
  const { scrollY } = useScroll()
  const [addShadow, setAddShadow] = useState(false)
  const { articleCount } = usePaywall()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!addShadow && latest > 110) {
      setAddShadow(true)
    }
    if (addShadow && latest < 20) {
      setAddShadow(false)
    }
  })

  const progress = useMotionValue(articleCount === 0 ? 0 : articleCount / ARTICLES_COUNT_LIMIT)

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (articleCount !== 0) {
      progress.set(articleCount / ARTICLES_COUNT_LIMIT)
    } else {
      progress.set(0)
    }
  }, [articleCount, progress, scaleX])

  return (
    <header
      className={classNames(styles.header, {
        [styles.shadow]: addShadow,
      })}
    >
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <Link className={styles.headerWrapper} to='/'>
        <Icon className={styles.icon} />
        <h1 className={styles.title}>
          Tennis<span className={styles.chronicles}>Chronicles</span>
        </h1>
      </Link>
    </header>
  )
}
