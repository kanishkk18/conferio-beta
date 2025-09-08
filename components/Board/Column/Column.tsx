import { FC, useRef, useState } from 'react';
import Task from '../Task/Task';
import { UniqueIdentifier } from '@dnd-kit/core';
import Droppable from '../../Drag-and-drop/Droppable';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Task as TaskType } from '../../../types';
import useClickOutside from '../../../hooks/useClickOutside';
import ColorPicker from '../../ColorPicker/ColorPicker';
import { mutate } from 'swr';
import useModal from '../../../hooks/useModal';
import TaskForm from '../../Modals/TaskForm';
import { Plus } from 'lucide-react';
import { useBoardsContext } from '../../../store/BoardListContext';

type ColumnData = {
  color: string;
  tasks: TaskType[];
  uuid: string;
  board_uuid: string;
};

type ColumnProps = {
  name: UniqueIdentifier;
  columnData: ColumnData;
};

type ColumnHeaderProps = {
  name: string;
  columnData: ColumnData;
};

const ColumnHeader: FC<ColumnHeaderProps> = ({ name, columnData }) => {
  const [color, setColor] = useState(columnData.color);
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const mobileMenu = useModal({ type: 'mobileMenu' });
  const newTaskModal = useModal();
  const { selectedBoard, mutateBoards } = useBoardsContext();
  const NewTaskModal = newTaskModal.Component;
  const sortedColumns = selectedBoard?.columns.sort(
    (a, b) => a.position - b.position
  );

  const pickerRef = useRef<HTMLDivElement>(null);
  const colorIndicatorRef = useRef<HTMLButtonElement>(null);

  useClickOutside(pickerRef, (e) => {
    if (e.target === colorIndicatorRef.current) return;
    setColor(columnData.color);
    setPickerIsOpen(false);
  });

  const handlePickerToggle = () => {
    if (pickerIsOpen) setColor(columnData.color); // reset color if picker is closed without saving
    setPickerIsOpen(!pickerIsOpen);
  };

  const colorChangeHandler = () => {
    fetch(`/api/columns/${columnData.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color,
      }),
    }).then(() => {
      mutate(`/api/boards/${columnData.board_uuid}`);
      setPickerIsOpen(false);
    });
  };

  const handleNewTaskClick = () => {
    mobileMenu.close();
    newTaskModal.toggle();
  };

  // const sortedColumns = columnData?.tasks.sort((a, b) => a.position - b.position);

  return (
    <>
      <div className="relative items-center justify-between px-2 mb-6 bg-neutral-50 dark:bg-neutral-900 rounded-3xl py-2 flex">
        <div className="flex justify-center items-center">
          <button
            ref={colorIndicatorRef}
            data-testid="column-color"
            className={`mr-3 ml-1 h-3 w-3 rounded-full`}
            style={{ backgroundColor: color }}
            onClick={handlePickerToggle}
          />
          {pickerIsOpen && (
            <div ref={pickerRef}>
              <ColorPicker
                className="absolute top-6"
                initialColor={columnData.color}
                setColor={setColor}
                onSubmit={colorChangeHandler}
              />
            </div>
          )}

          <p
            data-testid="column-header"
            className="text-sm font-medium dark:text-neutral-500"
          >
            {name}{' '}
            <span className="rounded-full border-l border-r border-neutral-600 p-1 px-2 ml-1">{`${columnData.tasks.length}`}</span>
          </p>
        </div>
        <div className="">
          <Plus
            className="h-7 w-7 p-1.5 border-none text-black dark:text-white rounded-full bg-neutral-200 dark:bg-neutral-700/50 "
            onClick={handleNewTaskClick}
          />

          <NewTaskModal>
            <TaskForm
              formType="new"
              closeModal={newTaskModal.close}
              columns={sortedColumns}
            />
          </NewTaskModal>
        </div>
      </div>
    </>
  );
};
const Column: FC<ColumnProps> = ({ name, columnData }) => {
  return (
    <Droppable
      droppableId={name}
      className="z-10  w-[360px] mt-4 bg-transparent text-neutral-600 font-bold overflow-scroll thin-scrollbar rounded-[12px] min-h-screen pt-4 px-2"
      data-testid="board-column"
    >
      <ColumnHeader name={name.toString()} columnData={columnData} />
      <SortableContext
        items={columnData.tasks.map((task) => task.uuid)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {columnData.tasks.map((task, i) => (
            <Task key={i} taskData={task} />
          ))}
        </ul>
      </SortableContext>
    </Droppable>
  );
};

export default Column;
