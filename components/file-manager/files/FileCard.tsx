import { 
  DocumentIcon,
  FolderIcon,
  PhotoIcon,
  FilmIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  EyeIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

interface FileCardProps {
  file: {
    id: string;
    name: string;
    size?: string;
    type: string;
    modifiedAt: string;
    owner: string;
    items?: number;
    sharedBy?: string;
    deletedAt?: string;
  };
  view: string;
}

const fileIcons = {
  pdf: DocumentIcon,
  image: PhotoIcon,
  video: FilmIcon,
  document: DocumentTextIcon,
  spreadsheet: DocumentIcon,
  folder: FolderIcon,
  archive: ArchiveBoxIcon,
};

export function FileCard({ file, view }: FileCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const IconComponent = fileIcons[file.type as keyof typeof fileIcons] || DocumentIcon;

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Add bounce animation
    if (cardRef.current) {
      cardRef.current.classList.add('animate-bounce-in');
      setTimeout(() => {
        cardRef.current?.classList.remove('animate-bounce-in');
      }, 500);
    }

    switch (action) {
      case 'like':
        setIsLiked(!isLiked);
        break;
      case 'star':
        setIsStarred(!isStarred);
        break;
      case 'select':
        setIsSelected(!isSelected);
        break;
      default:
        console.log(`Action: ${action} on file: ${file.name}`);
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`file-card border group relative animate-scale-in ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => handleAction('select', e as any)}
          className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* File Icon with enhanced styling */}
      <div className="flex items-center justify-center h-20 mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse-glow" />
        {file.type === 'folder' ? (
          <FolderIcon className="w-14 h-14 text-[hsl(var(--folder-icon))] transition-all duration-300 group-hover:scale-110" />
        ) : (
          <IconComponent className="w-14 h-14 text-[hsl(var(--file-icon))] transition-all duration-300 group-hover:scale-110" />
        )}
        
        {/* File type badge */}
        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 animate-slide-up">
          {file.type}
        </div>
      </div>

      {/* Enhanced File Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors duration-200" title={file.name}>
          {file.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {file.type === 'folder' ? (
              `${file.items} items`
            ) : (
              file.size
            )}
          </span>
          <div className="flex items-center gap-1">
            {isStarred && <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />}
            {isLiked && <HeartIcon className="w-3 h-3 text-red-500 fill-current" />}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {view === 'trash' ? (
            <span className="text-destructive">Deleted {file.deletedAt}</span>
          ) : (
            <span>Modified {file.modifiedAt}</span>
          )}
        </div>

        {file.sharedBy && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-accent/10 px-2 py-1 rounded-full">
            <ShareIcon className="w-3 h-3" />
            <span>by {file.sharedBy}</span>
          </div>
        )}
      </div>

      {/* Enhanced Actions Menu */}
      <div className={`absolute top-3 right-3 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <button className="btn-glass w-8 h-8 flex items-center justify-center" onClick={(e) => handleAction('menu', e)}>
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Action Buttons */}
      <div className={`absolute bottom-3 right-3 flex gap-1 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {view !== 'trash' && (
          <>
            <button 
              className="btn-glass w-8 h-8 flex items-center justify-center" 
              title="Preview"
              onClick={(e) => handleAction('preview', e)}
            >
              <EyeIcon className="w-4 h-4" />
            </button>
            <button 
              className={`btn-glass w-8 h-8 flex items-center justify-center ${isLiked ? 'bg-red-500/20 text-red-500' : ''}`}
              title="Like"
              onClick={(e) => handleAction('like', e)}
            >
              <HeartIcon className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              className={`btn-glass w-8 h-8 flex items-center justify-center ${isStarred ? 'bg-yellow-500/20 text-yellow-500' : ''}`}
              title="Star"
              onClick={(e) => handleAction('star', e)}
            >
              <StarIcon className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
            </button>
            <button 
              className="btn-glass w-8 h-8 flex items-center justify-center" 
              title="Download"
              onClick={(e) => handleAction('download', e)}
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
            </button>
          </>
        )}
        <button 
          className="btn-glass w-8 h-8 flex items-center justify-center text-destructive hover:bg-destructive/20" 
          title={view === 'trash' ? 'Delete Forever' : 'Move to Trash'}
          onClick={(e) => handleAction('delete', e)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar for uploads (if needed) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-full bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
      </div>
    </div>
  );
}