// // import { generateComponents } from "@uploadthing/react";

// // import type { OurFileRouter } from "@/pages/api/uploadthing/core";

// // export const { UploadButton, UploadDropzone, Uploader } =
// //   generateComponents<OurFileRouter>();



// // import { generateComponents } from "@uploadthing/react";
// // import type { OurFileRouter } from "pages/api/uploadthing/core";

// // export const { UploadButton , Uploader } = generateComponents<OurFileRouter>();


// // lib/s3-upload.ts
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { v4 as uuidv4 } from "uuid";

// // Configure AWS S3
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export const uploadToS3 = async (file: File, endpoint: "messageFile" | "serverImage") => {
//   try {
//     // Generate a unique filename
//     const fileExtension = file.name.split('.').pop();
//     const key = `${endpoint}/${uuidv4()}.${fileExtension}`;
    
//     // Create the command to put the object in S3
//     const command = new PutObjectCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: key,
//       ContentType: file.type,
//       Body: file,
//     });

//     // Upload the file
//     await s3Client.send(command);
    
//     // Return the public URL (adjust based on your bucket configuration)
//     return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
//   } catch (error) {
//     console.error("Error uploading to S3:", error);
//     throw error;
//   }
// };