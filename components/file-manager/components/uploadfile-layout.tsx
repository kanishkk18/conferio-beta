'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Grid, List, Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface File {
  id: string
  originalName: string
  size: number
  mimeType: string
  ext: string
  url: string
  formattedSize: string
  createdAt: string
}

interface UploadFileLayoutProps {
  showToolBar?: boolean
  isShowPagination?: boolean
  pageSize?: number
  layoutView?: 'GRID' | 'LIST'
}

export default function UploadFileLayout({ showToolBar = true }: UploadFileLayoutProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState('GRID')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['files', searchKeyword, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        pageNumber: currentPage.toString(),
        ...(searchKeyword && { keyword: searchKeyword }),
      })

      const response = await fetch(`/api/files/all?${params}`)
      if (!response.ok) throw new Error('Failed to fetch files')
      return response.json()
    },
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    refetch()
  }

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === data?.files?.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(data?.files?.map((file: File) => file.id) || [])
    }
  }

  const handleDownload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to download')
      return
    }

    try {
      const response = await fetch('/api/files/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: selectedFiles }),
      })

      const result = await response.json()
      if (response.ok) {
        window.open(result.downloadUrl, '_blank')
        toast.success('Download started')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to download files')
    }
  }

  const handleDelete = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to delete')
      return
    }

    if (!confirm('Are you sure you want to delete the selected files?')) {
      return
    }

    try {
      const response = await fetch('/api/files/bulk-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds: selectedFiles }),
      })

      const result = await response.json()
      if (response.ok) {
        toast.success(`Deleted ${result.deletedCount} files`)
        setSelectedFiles([])
        refetch()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to delete files')
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  const files = data?.files || []
  const pagination = data?.pagination

  return (
    <div className="space-y-4">
     
      {selectedFiles.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
          <span className="text-sm">
            {selectedFiles.length} file(s) selected
          </span>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" variant="outline" onClick={() => setSelectedFiles([])}>
            Clear
          </Button>
        </div>
      )}

      {files.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={selectedFiles.length === files.length}
            onChange={handleSelectAll}
            className="rounded"
          />
          <span className="text-sm text-muted-foreground">
            Select all ({files.length} files)
          </span>
        </div>
      )}

      {files.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {files.map((file: File) => (
            <div
              key={file.id}
              className={`border rounded-lg p-4 hover:bg-secondary/50 transition-colors ${
                selectedFiles.includes(file.id) ? 'bg-secondary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                  className="mt-1 rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate" title={file.originalName}>
                    {file.originalName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {file.formattedSize} • {file.ext.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {file.mimeType.startsWith('image/') && (
                <div className="mt-3">
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}