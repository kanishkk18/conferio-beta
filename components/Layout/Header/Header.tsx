import React, { FC, useEffect, useState } from 'react';
// import { ButtonPrimaryLarge } from '../../Buttons/Buttons';
import {
  AddTaskIconMobile,
  Chevron,
} from '../../Icons/Icons';
import MobileMenu from '../../Modals/MobileMenu';
import { useBoardsContext } from '../../../store/BoardListContext';
import useModal from 'hooks/useModal';
import TaskForm from '../../Modals/TaskForm';
import usePopover from 'hooks/usePopover';
import { useRouter } from 'next/router';
import BoardForm from '../../Modals/BoardForm';
import { mutate } from 'swr';
import { LinkContainer, PopoverLink } from '../../Popover/Popover';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, FilePlus2 } from 'lucide-react';

const Header: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mobileMenu = useModal({ type: 'mobileMenu' });
  const newTaskModal = useModal();
  const router = useRouter();
  const { selectedBoard, mutateBoards } = useBoardsContext();

  // Strings for the delete modal
  const modalTitle = 'Delete this board?';
  const modalMessage = `Are you sure you want to delete the ‘${selectedBoard?.name}’ board? This action will remove all columns and tasks and cannot be reversed.`;

  const confirmDeleteHandler = async () => {
    await fetch(`/api/boards/${selectedBoard?.uuid}`, {
      method: 'DELETE',
    });
    mutateBoards();
    deleteBoardModal.close();
    await router.reload();
  };
  const deleteBoardModal = useModal({
    type: 'danger',
    dangerHeader: modalTitle,
    dangerMessage: modalMessage,
    onConfirmDelete: confirmDeleteHandler,
  });
  const DeleteBoardModal = deleteBoardModal.Component;

  const { Component: Popover, ...optionsPopover } = usePopover();

  const NewTaskModal = newTaskModal.Component;
  const MenuModal = mobileMenu.Component;

  const editBoardModal = useModal();
  const EditBoardModal = editBoardModal.Component;

  const handleOptionsClick = (e: React.MouseEvent) => {
    mobileMenu.close();
    optionsPopover.toggle(e);
  };

  const handleNewTaskClick = () => {
    mobileMenu.close();
    newTaskModal.toggle();
  };

  const handleEditBoard = () => {
    optionsPopover.close();
    editBoardModal.toggle();
    mutate(`/api/boards/${selectedBoard?.uuid}`);
  };

  const handleBoardUpdate = () => {
    editBoardModal.close();
    mutateBoards();
    mutate(`/api/boards/${selectedBoard?.uuid}`);
  };

  const handleDeleteBoard = () => {
    optionsPopover.close();
    deleteBoardModal.toggle();
  };

  const sortedColumns = selectedBoard?.columns.sort(
    (a, b) => a.position - b.position
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="flex items-center justify-between bg-transparent text-2xl font-jakarta text-black font-semibold sm:border-l">
      <div className="relative flex">
        {isMobile ? (
          <button
            id="mobile-menu-toggle"
            className="flex items-center justify-center sm:hidden"
            onClick={mobileMenu.toggle}
          >
            <h1
              id="board-header"
              className="max-w-[45vw] overflow-hidden text-ellipsis whitespace-nowrap text-xl"
            >
              {selectedBoard?.name || 'Select board'}
            </h1>
            <Chevron
              className={`ml-2 transition-all ${mobileMenu.isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        ) : (
          <h1
            id="board-header"
            className="ml-6 max-w-[30vw] overflow-hidden dark:text-white text-ellipsis whitespace-nowrap text-2xl sm:font-bold lg:max-w-none lg:text-2xl"
          >
            {selectedBoard?.name}
          </h1>
        )}
        <MenuModal>
          <MobileMenu setMenuIsOpen={mobileMenu.close} />
        </MenuModal>
      </div>
      <div className="flex items-center">
        <Button
          onClick={handleNewTaskClick}
          id="new-task"
          className="mr-2 md:mr-4 "
          variant={'outline'}
          disabled={!sortedColumns?.length}
        >
          <span className="hidden sm:block dark:text-white text-[14px] font-medium md:flex justify-center items-center gap-2 text-center">
            <FilePlus2 className="bg-muted/60 h-4 w-5 rounded-full" />{' '}
            Create Task
          </span>
          <AddTaskIconMobile className="sm:hidden" />
        </Button>
        <NewTaskModal>
          <TaskForm
            formType="new"
            closeModal={newTaskModal.close}
            columns={sortedColumns}
          />
        </NewTaskModal>
        <button
          aria-label="Board options"
          id="board-options"
          className="mr-2 inline-flex justify-center"
          onClick={handleOptionsClick}
        >
          <ArrowRightLeft className="pointer-events-none dark:text-neutral-500 h-5 w-5" />
        </button>
        <Popover className="mt-8 bg-transparent -translate-x-full md:mt-12">
          <LinkContainer className="bg-white dark:bg-neutral-950 rounded-lg p-4 shadow-md">
            <PopoverLink
              disabled={!selectedBoard}
              onClick={handleEditBoard}
              id="board-edit"
            >
              Edit Board
            </PopoverLink>
            <PopoverLink
              disabled={!selectedBoard}
              danger={true}
              onClick={handleDeleteBoard}
              id="board-delete"
            >
              Delete Board
            </PopoverLink>
            {/* <div className="relative mb-4 mt-8 h-px w-full bg-mid-grey">
                            {session.data?.user?.image && (
                                <img
                                    src={session.data?.user?.image}
                                    className="absolute left-1/2 top-1/2 w-8 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white p-1 dark:bg-v-dark-grey"
                                />
                            )}
                        </div>
                        <PopoverLink id="logout" onClick={() => signOut()}>
                            Log out
                        </PopoverLink> */}
          </LinkContainer>
        </Popover>
        <DeleteBoardModal />
        <EditBoardModal>
          <BoardForm
            formType="edit"
            boardData={selectedBoard!}
            onBoardUpdated={handleBoardUpdate}
          />
        </EditBoardModal>
      </div>
    </header>
  );
};

export default Header;
