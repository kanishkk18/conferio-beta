// 'use client'

// import { useState, useCallback } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { Progress } from '@/components/ui/progress'
// import { Upload, X, File, Image, Video, Music } from 'lucide-react'
// import { toast } from 'sonner'
// import { formatBytes } from '@/lib/utils'

// interface FileWithPreview extends File {
//   preview?: string
// }

// export function FileUploaderDialog({ children }: { children: React.ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [files, setFiles] = useState<FileWithPreview[]>([])
//   const [uploading, setUploading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0)

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const filesWithPreview = acceptedFiles.map(file => {
//       const fileWithPreview = file as FileWithPreview
//       if (file.type.startsWith('image/')) {
//         fileWithPreview.preview = URL.createObjectURL(file)
//       }
//       return fileWithPreview
//     })
//     setFiles(prev => [...prev, ...filesWithPreview])
//   }, [])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//   })

//   const removeFile = (index: number) => {
//     setFiles(prev => {
//       const newFiles = [...prev]
//       if (newFiles[index].preview) {
//         URL.revokeObjectURL(newFiles[index].preview!)
//       }
//       newFiles.splice(index, 1)
//       return newFiles
//     })
//   }

//   const getFileIcon = (mimeType: string) => {
//     if (mimeType.startsWith('image/')) return <Image className="h-8 w-8" />
//     if (mimeType.startsWith('video/')) return <Video className="h-8 w-8" />
//     if (mimeType.startsWith('audio/')) return <Music className="h-8 w-8" />
//     return <File className="h-8 w-8" />
//   }

//   const handleUpload = async () => {
//     if (files.length === 0) {
//       toast.error('Please select files to upload')
//       return
//     }

//     setUploading(true)
//     setUploadProgress(0)

//     try {
//       const formData = new FormData()
//       files.forEach(file => {
//         formData.append('files', file)
//       })

//       const response = await fetch('/api/files/upload', {
//         method: 'POST',
//         body: formData,
//       })

//       const result = await response.json()

//       if (response.ok) {
//         toast.success(result.message)
//         setFiles([])
//         setIsOpen(false)
//         // Refresh the files list if needed
//         window.location.reload()
//       } else {
//         toast.error(result.message || 'Upload failed')
//       }
//     } catch (error) {
//       toast.error('Upload failed')
//     } finally {
//       setUploading(false)
//       setUploadProgress(0)
//     }
//   }

//   const totalSize = files.reduce((sum, file) => sum + file.size, 0)

//   return (
//     <div >
     
//       <div className="max-w-2xl max-h-[50vh] overflow-y-auto">
        
//         <div className="space-y-4">
//           <Card
//             {...getRootProps()}
//             className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
//               isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
//             }`}
//           >
//             <input {...getInputProps()} />
//             <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//             {isDragActive ? (
//               <p>Drop the files here...</p>
//             ) : (
//               <div>
//                 <p className="text-lg font-medium">Drop files here or click to browse</p>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Support for multiple file uploads
//                 </p>
//               </div>
//             )}
//           </Card>

//           {files.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-medium">Selected Files ({files.length})</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Total: {formatBytes(totalSize)}
//                 </p>
//               </div>

//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
//                     {file.preview ? (
//                       <img
//                         src={file.preview}
//                         alt={file.name}
//                         className="uploadimg"
//                       />
//                     ) : (
//                       <div className="h-12 w-12 flex items-center justify-center bg-muted rounded">
//                         {getFileIcon(file.type)}
//                       </div>
//                     )}
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium truncate">{file.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                          {formatBytes(file.size)}
//                       </p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFile(index)}
//                       disabled={uploading}>
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>

//               {uploading && (
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span>Uploading...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <Progress value={uploadProgress} />
//                 </div>
//               )}

//               <div className="flex gap-2">
//                 <Button
//                   onClick={handleUpload}
//                   disabled={uploading}
//                   className="flex-1"
//                 >
//                   {uploading ? 'Uploading...' : `Upload ${files.length} file(s)`}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => setFiles([])}
//                   disabled={uploading}
//                 >
//                   Clear All
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Upload, X, File, Image, Video, Music } from 'lucide-react'
import { toast } from 'sonner'
import { formatBytes } from '@/lib/utils'
import { useRouter } from 'next/navigation'


interface FileWithPreview extends File {
  preview?: string
}

export function FileUploaderDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const Router = useRouter()
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file)
      }
      return fileWithPreview
    })
    setFiles(prev => [...prev, ...filesWithPreview])
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'application/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx']
    }
  })

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-8 w-8" />
    if (mimeType.startsWith('video/')) return <Video className="h-8 w-8" />
    if (mimeType.startsWith('audio/')) return <Music className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulate progress (real implementation would use actual upload progress)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev
        return prev + 10
      })
    }, 200)

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || 'Upload successful!')
        // Wait a moment to show 100% progress before closing
        setTimeout(() => {
          setFiles([])
          setIsOpen(false)
          Router.refresh()
        }, 500)
      } else {
        toast.error(result.message || 'Upload failed')
      }
    } catch (error) {
      clearInterval(interval)
      toast.error('Upload failed. Please try again.')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Select or drag and drop files to upload to your storage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card
            {...getRootProps()}
            className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports images, videos, audio, and documents
                </p>
                <Button 
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                >
                  Select Files
                </Button>
              </div>
            )}
          </Card>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Selected Files ({files.length})</h3>
                <p className="text-sm text-muted-foreground">
                  Total: {formatBytes(totalSize)}
                </p>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center bg-muted rounded">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? 'Uploading...' : `Upload ${files.length} file(s)`}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFiles([])}
                  disabled={uploading}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
