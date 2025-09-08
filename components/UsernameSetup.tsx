import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function UsernameSetup() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/set-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the session with the new username
        await update({ username });
        router.reload(); // Reload the page to reflect changes
      } else {
        setError(data.message || 'Error setting username');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session || session.user.username) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger><Edit className="w-4 h-4" /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Your Username</DialogTitle>
          <DialogDescription>
            Please choose a username to continue using the platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>

           <div className="*:not-first:mt-2 space-y-3 mb-4">
      <Label>Username</Label>
      <div className="relative">
        <Input
         type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          className="peer ps-[8.5rem] dark:text-white"
          placeholder="John_doe18"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          conferio-calls.com/
        </span>
      </div>
    </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || username.length < 3}
            className="w-fit bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Updating' : 'Update'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
