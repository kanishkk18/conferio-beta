// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { getAllFilesService } from '@/lib/services/files'

// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         { status: 401 }
//       )
//     }

//     const { searchParams } = new URL(req.url)
//     const keyword = searchParams.get('keyword') || undefined
//     const pageSize = parseInt(searchParams.get('pageSize') || '20')
//     const pageNumber = parseInt(searchParams.get('pageNumber') || '1')

//     const result = await getAllFilesService(
//       session.user.id,
//       { keyword },
//       { pageSize, pageNumber }
//     )

//     return NextResponse.json({
//       message: 'All files retrieved successfully',
//       ...result,
//     })
//   } catch (error) {
//     console.error('Get files error:', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllFilesService } from '@/lib/services/files'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const {
      keyword,
      pageSize = '20',
      pageNumber = '1'
    } = req.query

    const result = await getAllFilesService(
      session.user.id,
      { keyword: keyword as string | undefined },
      { 
        pageSize: parseInt(pageSize as string), 
        pageNumber: parseInt(pageNumber as string) 
      }
    )

    return res.status(200).json({
      message: 'All files retrieved successfully',
      ...result,
    })
  } catch (error) {
    console.error('Get files error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}