import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));
    
    setUploadFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      simulateUpload(uploadFiles.length + index);
    });
  }, [uploadFiles.length]);

  const simulateUpload = (index: number) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].progress < 100) {
          updated[index].progress += Math.random() * 20;
          if (updated[index].progress >= 100) {
            updated[index].progress = 100;
            updated[index].status = 'completed';
            clearInterval(interval);
            
            // Auto-close modal after all uploads complete
            setTimeout(() => {
              if (updated.every(f => f.status === 'completed')) {
                handleClose();
              }
            }, 1000);
          }
        }
        return updated;
      });
    }, 300);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleClose = () => {
    setUploadFiles([]);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Upload Files
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="w-6 h-6 p-0"
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`upload-zone p-8 text-center cursor-pointer ${
              isDragActive ? 'dragover' : ''
            }`}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {isDragActive ? 'Drop files here' : 'Upload files'}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="outline">
              Browse Files
            </Button>
          </div>

          {/* Upload Progress */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {uploadFiles.map((uploadFile, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                  <div className="flex-shrink-0">
                    {uploadFile.status === 'completed' ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <DocumentIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {uploadFile.file.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(uploadFile.file.size)}
                      </span>
                    </div>
                    
                    {uploadFile.status === 'uploading' && (
                      <div className="space-y-1">
                        <Progress value={uploadFile.progress} className="h-1" />
                        <p className="text-xs text-muted-foreground">
                          {Math.round(uploadFile.progress)}% uploaded
                        </p>
                      </div>
                    )}
                    
                    {uploadFile.status === 'completed' && (
                      <p className="text-xs text-green-600">Upload completed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}