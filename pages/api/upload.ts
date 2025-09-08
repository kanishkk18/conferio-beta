// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const { fileName, fileType, endpoint, fileData } = req.body;
    
    // Validate required parameters
    if (!fileName || !fileType || !endpoint || !fileData) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required parameters' 
      });
    }

    // Validate environment variables
    if (!process.env.AWS_ACCESS_KEY_ID || 
        !process.env.AWS_SECRET_ACCESS_KEY || 
        !process.env.AWS_S3_BUCKET_NAME) {
      return res.status(500).json({
        success: false,
        error: 'AWS configuration is missing'
      });
    }

    const region = process.env.AWS_REGION || 'us-east-1';
    
    // Initialize S3 client
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const fileExtension = fileName.split('.').pop() || '';
    const key = `${endpoint}/${uuidv4()}.${fileExtension}`;
    
    // Convert base64 to buffer
    const buffer = Buffer.from(fileData.split(',')[1], 'base64');
    
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: fileType,
    });

    // Upload directly from server (no CORS issues)
    await s3Client.send(command);

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

    res.status(200).json({ 
      success: true,
      fileUrl
    });

  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error uploading file',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}