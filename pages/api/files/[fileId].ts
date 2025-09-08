import { NextApiRequest, NextApiResponse } from 'next'
import { getFileUrlService } from '@/lib/services/files'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fileId } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { stream, contentType, fileSize } = await getFileUrlService(fileId as string)

    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Length', fileSize)
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('Content-Disposition', 'inline')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    stream.pipe(res)
  } catch (error) {
    console.error('Get file error:', error)
    res.status(404).json({ message: 'File not found' })
  }
}