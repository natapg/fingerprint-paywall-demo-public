import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getArticleCount, getArticleCountWithId, deleteAllArticles } from '../helpers/api'
import { ARTICLES_COUNT_LIMIT } from '../constants/env'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

interface PaywallContextProps {
  articleCount: number
  paywallEnabled: boolean
  visitorId?: string
  isLoading: boolean
  setArticle: (id: number) => void
  deleteArticles: () => void
}

const PaywallContext = createContext<PaywallContextProps>({
  articleCount: 0,
  paywallEnabled: false,
  isLoading: true,
  setArticle: () => {},
  deleteArticles: () => {},
})

export const usePaywall = (): PaywallContextProps => useContext(PaywallContext)

export const PaywallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articleCount, setArticleCount] = useState<number>(0)
  const [articleId, setArticleId] = useState<number | undefined>()
  const [paywallEnabled, setPaywallEnabled] = useState<boolean>(false)
  const [visitorId, setVisitorId] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { data } = useVisitorData()

  useEffect(() => {
    setVisitorId(data?.visitorId)
  }, [data])

  useEffect(() => {
    const fetchArticleCount = async () => {
      if (visitorId) {
        setIsLoading(true)
        try {
          let count
          if (articleId) {
            count = await getArticleCountWithId(visitorId, articleId)
          } else {
            count = await getArticleCount(visitorId)
          }
          setArticleCountChecked(count)
          setPaywallEnabled(count >= ARTICLES_COUNT_LIMIT)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching article count:', error)
          setIsLoading(false)
        }
      }
    }

    fetchArticleCount()
  }, [visitorId, articleId])

  const setArticle = useCallback((id: number) => {
    setArticleId(id)
  }, [])

  const deleteArticles = useCallback(async () => {
    setIsLoading(true)
    try {
      if (visitorId) {
        await deleteAllArticles(visitorId)
        const count = await getArticleCount(visitorId)
        setArticleCountChecked(count)
        setPaywallEnabled(count >= ARTICLES_COUNT_LIMIT)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error deleting articles:', error)
      setIsLoading(false)
    }
  }, [visitorId])

  const setArticleCountChecked = (count: number) => {
    if (count <= ARTICLES_COUNT_LIMIT) {
      setArticleCount(count)
    } else {
      setArticleCount(ARTICLES_COUNT_LIMIT)
    }
  }

  return (
    <PaywallContext.Provider value={{ articleCount, paywallEnabled, visitorId, isLoading, setArticle, deleteArticles }}>
      {children}
    </PaywallContext.Provider>
  )
}
