import { 
  FolderIcon,
  ShareIcon,
  CloudArrowUpIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface EmptyStateProps {
  view: string;
}

const emptyStates = {
  'my-drive': {
    icon: FolderIcon,
    title: 'No files in your drive',
    description: 'Upload your first file to get started with TeamDrive.',
  },
  'shared': {
    icon: ShareIcon,
    title: 'No shared files',
    description: 'Files shared with you by team members will appear here.',
  },
  'uploads': {
    icon: CloudArrowUpIcon,
    title: 'No uploads yet',
    description: 'Files you upload will be listed here for easy access.',
  },
  'trash': {
    icon: TrashIcon,
    title: 'Trash is empty',
    description: 'Files you delete will be moved here before permanent deletion.',
  },
};

export function EmptyState({ view }: EmptyStateProps) {
  const state = emptyStates[view as keyof typeof emptyStates];
  
  if (!state) {
    return null;
  }

  const IconComponent = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{state.title}</h3>
      <p className="text-muted-foreground max-w-sm">{state.description}</p>
    </div>
  );
}