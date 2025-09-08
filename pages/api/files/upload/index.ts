// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { uploadFilesService } from '@/lib/services/files'
// import { UploadSource } from '@prisma/client'

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         { status: 401 }
//       )
//     }

//     const formData = await req.formData()
//     const files = formData.getAll('files') as File[]

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { message: 'No files provided' },
//         { status: 400 }
//       )
//     }

//     const result = await uploadFilesService(
//       session.user.id,
//       files,
//       UploadSource.WEB
//     )

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Upload error:', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { uploadFilesService } from '@/lib/services/files'
// import { UploadSource } from '@prisma/client'
// import formidable from 'formidable'
// import fs from 'fs'

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser to handle form data
//   },
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' })
//   }

//   try {
//     const session = await getServerSession(req, res, authOptions)
    
//     if (!session?.user?.id) {
//       return res.status(401).json({ message: 'Unauthorized' })
//     }

//     // Parse form data
//     const form = formidable({ multiples: true })
//     const [fields, files] = await form.parse(req)
    
//     const fileList = files.files || []
    
//     if (!fileList || fileList.length === 0) {
//       return res.status(400).json({ message: 'No files provided' })
//     }

//     // Convert formidable files to a format the service expects
//     const formattedFiles = fileList.map(file => ({
//       originalFilename: file.originalFilename || '',
//       filepath: file.filepath,
//       mimetype: file.mimetype || '',
//       size: file.size,
//     }))

//     const result = await uploadFilesService(
//       session.user.id,
//       formattedFiles,
//       UploadSource.WEB
//     )

//     // Clean up temporary files
//     fileList.forEach(file => {
//       fs.unlinkSync(file.filepath)
//     })

//     return res.status(200).json(result)
//   } catch (error) {
//     console.error('Upload error:', error)
//     return res.status(500).json({ message: 'Internal server error' })
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadFilesService } from '@/lib/services/files'
import { UploadSource } from '@prisma/client'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle form data
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Parse form data
    const form = formidable({ multiples: true })
    const [fields, files] = await form.parse(req)
    
    const fileList = files.files || []
    
    if (!fileList || fileList.length === 0) {
      return res.status(400).json({ message: 'No files provided' })
    }

    // Convert formidable files to a format the service expects
    const formattedFiles = await Promise.all(
      fileList.map(async (file) => {
        const buffer = await fs.promises.readFile(file.filepath)
        const fileData = new File([buffer], file.originalFilename || 'unknown', {
          type: file.mimetype || 'application/octet-stream',
        });
        return fileData;
      })
    )

    const result = await uploadFilesService(
      session.user.id,
      formattedFiles,
      UploadSource.WEB
    )

    // Clean up temporary files
    fileList.forEach(file => {
      fs.unlinkSync(file.filepath)
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}