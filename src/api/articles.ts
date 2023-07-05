import { VercelRequest, VercelResponse } from '@vercel/node'
import supabase from './lib/supabase'

const articles = async (req: VercelRequest, res: VercelResponse) => {
  const { query } = req
  const visitorId = query['visitorId'] as string
  const articleId = query['articleId'] ? parseInt(query['articleId'] as string) : null

  const articleIds = await getAlreadyReadArticleIds(visitorId)

  if (articleId && !articleIds.includes(articleId)) {
    // If the current article is not one of the articles read in the last 7 days,
    // insert the current article read event for the visitor
    await insertArticleReadRow(visitorId, articleId)

    // After inserting the new article, recalculate the articleCount
    const updatedArticleIds = await getAlreadyReadArticleIds(visitorId)
    const articleCount = updatedArticleIds.length

    res.status(200).json({ articleCount: articleCount })
  } else {
    const articleCount = articleIds.length
    res.status(200).json({ articleCount: articleCount })
  }
}

export async function getAlreadyReadArticleIds(visitorId: string): Promise<number[]> {
  // Retrieve distinct article_ids for the visitor within the last 7 days
  const { data: result, error } = await supabase
    .from('distinct_article_reads')
    .select('article_ids')
    .eq('visitor_id', visitorId)
    .maybeSingle()

  if (error) {
    console.error(error)
    throw error
  }

  const articleIds = result ? result.article_ids : []
  return articleIds
}

async function insertArticleReadRow(visitorId: string, articleId: number) {
  // Insert the current article read event for the visitor
  const { error } = await supabase.from('article_reads').upsert({ visitor_id: visitorId, article_id: articleId })

  if (error) {
    console.error(error)
    throw error
  }
}

export default articles
