import { HOST } from '../constants/env'

export async function getArticleCount(visitorId: string): Promise<number> {
  try {
    const response = await fetch(`${HOST}/api/articles/?visitorId=${visitorId}`)

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`
      throw new Error(message)
    }

    const paywallData = await response.json()
    return paywallData.articleCount as number
  } catch (error) {
    console.error('Error in getArticleCount:', error)
    throw error
  }
}

export async function getArticleCountWithId(visitorId: string, articleId: number): Promise<number> {
  try {
    const response = await fetch(`${HOST}/api/articles/?visitorId=${visitorId}&articleId=${articleId}`)

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`
      throw new Error(message)
    }

    const paywallData = await response.json()
    return paywallData.articleCount as number
  } catch (error) {
    console.error('Error in getArticleCountWithId:', error)
    throw error
  }
}

export async function deleteAllArticles(visitorId: string): Promise<void> {
  try {
    const response = await fetch(`${HOST}/api/delete_articles/?visitorId=${visitorId}`)

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`
      throw new Error(message)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }
  } catch (error) {
    console.error('Error in deleteAllArticles:', error)
    throw error
  }
}
