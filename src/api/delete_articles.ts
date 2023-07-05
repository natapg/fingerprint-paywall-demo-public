import { VercelRequest, VercelResponse } from '@vercel/node'
import supabase from './lib/supabase'

const deleteArticles = async (req: VercelRequest, res: VercelResponse) => {
  const { query } = req
  const visitorId = query['visitorId'] as string

  try {
    await deleteAllArticleReads(visitorId)
    res.status(200).json({ message: 'All articles deleted successfully' })
  } catch (error) {
    console.error('Error deleting articles:', error)
    res.status(500).json({ error: 'Failed to delete articles' })
  }
}

async function deleteAllArticleReads(visitorId: string) {
  // Delete all article reads for the visitor
  const { error } = await supabase.from('article_reads').delete().eq('visitor_id', visitorId)

  if (error) {
    console.error(error)
    throw error
  }
}

export default deleteArticles
