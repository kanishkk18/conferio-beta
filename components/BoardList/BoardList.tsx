import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { BoardIcon } from '../Icons/Icons';
import type { Board } from '../../types';
import { useBoardsContext } from '../../store/BoardListContext';
import BoardForm from '../Modals/BoardForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// type BoardFormProps = {
//   onNewBoardCreated?: Function;
//   onBoardUpdated?: Function;
//   boardData?: Board;
//   formType: 'new' | 'edit';
//   onCancel?: () => void;
// };


const BoardLink: FC<{ board: Board }> = ({ board }) => {
  const router = useRouter();
  const isActive = router.query.boardId === board.uuid;

  return (
    <Link
      href={`/board/${board.uuid}`}
      className={` text-base font-bold   ${
        isActive
          ? ' '
          : ' text-mid-grey hover:bg-grey-highlight hover:text-primary dark:hover:bg-white'
      }`} >
      <span className=" overflow-hidden text-ellipsis whitespace-nowrap">
        {board.name}
      </span>
    </Link>
  );
};

const BoardList: FC<{ handleBoardSelect?: Function }> = ({
  handleBoardSelect,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { boards, isLoading } = useBoardsContext();
  const router = useRouter();
  const { mutateBoards } = useBoardsContext();

  const boardSelectHandler = () => {
    handleBoardSelect && handleBoardSelect();
    setDialogOpen(false);
  };

  const handleNewBoardCreated = (newBoardUUID: string) => {
    mutateBoards();
    setDialogOpen(false);
    setShowForm(false);
    router.push(`/board/${newBoardUUID}`);
    handleBoardSelect && handleBoardSelect();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      setDialogOpen(open);
      if (!open) setShowForm(false); // Reset to list view when closing
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Board</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40%] w-fit max-w-6xl">
        {showForm ? (
            <>
            <DialogHeader>
              <DialogTitle>Create Board</DialogTitle>
            </DialogHeader>
            <BoardForm 
              formType="new" 
              onNewBoardCreated={handleNewBoardCreated}
            />
            <Button variant="outline" onClick={() => setShowForm(false)} className="mt-4">
              Cancel
            </Button>
            </>
        ) : (
          <>
            {boards && (
              <span
                id="board-count"
                data-testid="board-count"
                className="mb-5 text-xs uppercase tracking-[.2rem] text-mid-grey"
              >{`All Boards (${boards.length})`}</span>
            )}
            <div id="board-list" className="flex w-full flex-col">
              <ul
                className={`max-h-[calc(100vh-25rem)] overflow-y-auto ${
                  boards && boards.length > 0 ? 'min-h-[4rem]' : ''
                }`}
              >
                {boards?.map((board) => (
                  <li key={board.uuid} onClick={boardSelectHandler} className="py-2">
                    <BoardLink board={board} />
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowForm(true)}
                id="new-board-btn"
                className="group flex items-center py-3.5 pl-3 font-bold tracking-wide text-primary transition-all hover:text-primary-light lg:pl-6"
                disabled={isLoading}
              >
                <BoardIcon className="mr-2 h-4 fill-primary group-hover:fill-primary-light" />
                <span>{isLoading ? 'Loading boards...' : 'New Board'}</span>
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BoardList;